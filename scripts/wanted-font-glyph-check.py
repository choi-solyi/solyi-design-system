"""Validate the pinned official splits without modifying any font.

Requires fontTools with WOFF2 support (fonttools[woff]). Optional tools may be
installed outside the project and supplied with --tool-path.
"""

import argparse
import hashlib
import json
import re
import sys
from pathlib import Path


def arguments():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--directory', type=Path, required=True)
    parser.add_argument('--original', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--tool-path', type=Path)
    return parser.parse_args()


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def ranges(values):
    result = []
    for value in sorted(values):
        if result and result[-1][1] + 1 == value:
            result[-1][1] = value
        else:
            result.append([value, value])
    return ','.join(
        f'U+{a:04X}' if a == b else f'U+{a:04X}-{b:04X}' for a, b in result
    )


def declared_codepoints(value):
    result = set()
    for start, end in re.findall(r'U\+([0-9a-fA-F]+)(?:-([0-9a-fA-F]+))?', value):
        low = int(start, 16)
        high = int(end, 16) if end else low
        result.update(range(low, high + 1))
    return result


def axes(font):
    return [
        [axis.axisTag, axis.minValue, axis.defaultValue, axis.maxValue]
        for axis in font['fvar'].axes
    ]


def metrics(font):
    return {
        'unitsPerEm': font['head'].unitsPerEm,
        'hhea': {
            key: getattr(font['hhea'], key)
            for key in ['ascent', 'descent', 'lineGap']
        },
        'OS/2': {
            key: getattr(font['OS/2'], key)
            for key in [
                'sTypoAscender', 'sTypoDescender', 'sTypoLineGap',
                'usWinAscent', 'usWinDescent', 'sxHeight', 'sCapHeight',
            ]
        },
    }


def glyph_signatures(font, weight, pen_type):
    glyph_set = font.getGlyphSet(location={'wght': weight})
    signatures = {}
    for name in font.getGlyphOrder():
        glyph = glyph_set[name]
        pen = pen_type(glyph_set)
        glyph.draw(pen)
        value = json.dumps([glyph.width, pen.value], separators=(',', ':'))
        signatures[name] = hashlib.sha256(value.encode()).hexdigest()
    return signatures


def main():
    args = arguments()
    if args.tool_path:
        sys.path.insert(0, str(args.tool_path.resolve()))
    import fontTools
    from fontTools.pens.recordingPen import DecomposingRecordingPen
    from fontTools.ttLib import TTFont

    original = TTFont(args.original)
    original_cmap = original.getBestCmap()
    codepoints = set(original_cmap)
    original_axes = axes(original)
    original_metrics = metrics(original)
    weights = [400, 700, 1000]
    original_glyphs = {
        weight: glyph_signatures(original, weight, DecomposingRecordingPen)
        for weight in weights
    }
    css_path = args.directory / 'WantedSansVariable.css'
    css = css_path.read_text(encoding='utf-8')
    rules = re.findall(r'@font-face\s*\{([^}]+)\}', css)
    actual_union = set()
    effective_union = set()
    glyph_union = {weight: set() for weight in weights}
    errors = []
    records = []
    for rule in rules:
        relative = re.search(r'url\("\./([^"\s]+)"\)', rule).group(1)
        declaration = re.search(r'unicode-range:\s*([^;]+);', rule).group(1)
        declared = declared_codepoints(declaration)
        path = args.directory / relative
        font = TTFont(path)
        cmap = font.getBestCmap()
        actual_union.update(cmap)
        effective = set(cmap).intersection(declared)
        effective_union.update(effective)
        if axes(font) != original_axes:
            errors.append(f'Axis mismatch: {relative}')
        if metrics(font) != original_metrics:
            errors.append(f'Line metrics mismatch: {relative}')
        compared = 0
        for weight in weights:
            signatures = glyph_signatures(font, weight, DecomposingRecordingPen)
            glyph_union[weight].update(signatures.values())
            for codepoint in effective:
                expected = original_cmap.get(codepoint)
                if expected is None:
                    errors.append(f'Unexpected codepoint U+{codepoint:04X}')
                elif signatures[cmap[codepoint]] != original_glyphs[weight][expected]:
                    errors.append(
                        f'Glyph/advance mismatch {relative} U+{codepoint:04X} wght={weight}'
                    )
                compared += 1
        records.append({
            'local': relative,
            'sha256': sha256(path),
            'bytes': path.stat().st_size,
            'cmapCount': len(cmap),
            'cmapRanges': ranges(cmap),
            'effectiveCmapCount': len(effective),
            'glyphCount': len(font.getGlyphOrder()),
            'comparedGlyphInstances': compared,
        })
        font.close()
    if actual_union != codepoints:
        errors.append(f'Actual cmap union mismatch: missing={ranges(codepoints - actual_union)}')
    if effective_union != codepoints:
        errors.append(f'CSS effective cmap union mismatch: missing={ranges(codepoints - effective_union)}')
    missing_unencoded = {
        str(weight): len(set(original_glyphs[weight].values()) - glyph_union[weight])
        for weight in weights
    }
    result = {
        'method': 'Official unmodified split files; full cmap/CSS union, axes/line metrics, all encoded glyph outlines and advance widths at each stated weight.',
        'fontToolsVersion': fontTools.__version__,
        'original': {
            'sha256': sha256(args.original),
            'bytes': args.original.stat().st_size,
            'cmapCount': len(codepoints),
            'cmapRanges': ranges(codepoints),
            'glyphCount': len(original.getGlyphOrder()),
            'axes': original_axes,
            'metrics': original_metrics,
        },
        'cssSha256': sha256(css_path),
        'weightsCompared': weights,
        'faceCount': len(records),
        'splitCount': sum('.split.' in row['local'] for row in records),
        'actualUnionCount': len(actual_union),
        'effectiveUnionCount': len(effective_union),
        'missingOriginalGlyphSignatures': missing_unencoded,
        'errors': errors,
        'files': records,
    }
    args.output.write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({key: value for key, value in result.items() if key != 'files'}))
    if errors:
        raise SystemExit('Font validation failed; see output JSON.')


if __name__ == '__main__':
    main()
