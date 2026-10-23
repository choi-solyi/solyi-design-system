# Wanted Sans delivery

The font remains Wanted Sans Variable 1.0.3, weight axis 400–1000, from upstream
commit `02c9b822349c188ada95f9e2d90c2ed18f853235`. The original complete WOFF2 and OFL
are preserved without modification. `SOURCE.complete.original.json` preserves the
previous provenance, and both vendor stylesheets are retained as
`WantedSansVariable.complete.original.css` and `WantedSansVariable.split.original.css`.

The existing `WantedSansVariable.css` import path now combines 92 **official,
unmodified** unicode-range split fonts with one exact-range face for the original
complete font. The upstream splits cover 11,929 of the original 12,032 cmap entries.
The other 103 entries include IPA, combining accents, and ligature characters.
Their exact unicode range uses the original complete WOFF2, preserving coverage
without creating or renaming a derivative font.

Ordinary Hangul, English and UI symbols such as `₩→…✓` use the split files. Text
containing an omitted character, such as `ɐ`, U+0301, `ﬃ`, `⅛`, or `⸺`, legitimately
downloads the complete 1,289,292-byte original as well. The 92 splits total
2,281,860 bytes if every split is requested; this change targets the initial
characters needed by a page, rather than promising a smaller cumulative download
for every possible document. Actual requests and layout require browser checks.

`SPLIT-VALIDATION.json` records the cmap/CSS union, the unchanged weight axis and
line metrics, and every encoded glyph's decomposed outline and advance width
compared at weights 400, 700 and 1000. Font and stylesheet hashes bind that result
to these files. The original 12,663-glyph binary is retained intact.

To repeat the glyph validation with Python and `fonttools[woff]` available:

```text
python scripts/wanted-font-glyph-check.py --directory site/fonts/wanted-sans --original site/fonts/wanted-sans/woff2/WantedSansVariable.woff2 --output site/fonts/wanted-sans/SPLIT-VALIDATION.json
node scripts/wanted-font-delivery.mjs
node scripts/font-check.mjs --source-only
```

The validator can use an external temporary tool directory through `--tool-path`.
No Python runtime or fontTools dependency is added to the application. Delivery
CSS composition is deterministic; `wanted-font-delivery.mjs --write` regenerates
it from the preserved official CSS and validated cmap data.

Upstream: https://github.com/wanteddev/wanted-sans

License: SIL Open Font License 1.1, included in `OFL.txt`. All original copyright,
family names, font metadata and license notices remain with the font files.
