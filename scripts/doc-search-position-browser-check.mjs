import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile, stat, mkdir, writeFile } from "node:fs/promises";
import { resolve, sep, extname } from "node:path";
import { chromium } from "../.tooling/browser-qa/node_modules/playwright-core/index.mjs";
const baseline = process.argv.includes("--baseline"),
  root = resolve("docs"),
  out = resolve("qa-output/doc-search-20261105");
await mkdir(out, { recursive: true });
const server = createServer(async (req, res) => {
  try {
    let p = resolve(root, "." + new URL(req.url, "http://local").pathname);
    if (p !== root && !p.startsWith(root + sep)) throw Error("path");
    if ((await stat(p)).isDirectory()) p = resolve(p, "index.html");
    res.setHeader(
      "Content-Type",
      {
        ".html": "text/html;charset=utf-8",
        ".js": "text/javascript",
        ".css": "text/css",
        ".svg": "image/svg+xml",
        ".woff2": "font/woff2",
      }[extname(p)] || "application/octet-stream",
    );
    res.end(await readFile(p));
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const origin = process.argv.includes("--public")
    ? "https://ui.solyi.kr"
    : "http://127.0.0.1:" + server.address().port,
  records = [];
let browser;
try {
  browser = await chromium.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
    chromiumSandbox: true,
  });
  for (const width of baseline ? [475] : [320, 475, 1100]) {
    const context = await browser.newContext({
        viewport: { width, height: 650 },
        hasTouch: width < 800,
      }),
      page = await context.newPage();
    const appearance =
      width === 475
        ? { theme: "sage", mode: "dark" }
        : width === 1100
          ? { theme: "sand", mode: "light" }
          : { theme: "violet", mode: "light" };
    await page.goto(
      origin +
        "/?" +
        new URLSearchParams(appearance) +
        "#component/smonth-calendar",
    );
    await page.locator("#document-search-open").click();
    const panel = page.locator("#document-search-dialog"),
      input = page.locator("#document-search-query");
    await page.evaluate(() => document.fonts.ready);
    const measurements = [];
    for (const value of [
      "",
      "Chip",
      "Chi",
      "xxxxxxxx-no-result",
      "",
      "Date Picker",
    ]) {
      await input.fill(value);
      await page.waitForTimeout(60);
      measurements.push({
        value,
        ...(await panel.boundingBox()),
        inputY: (await input.boundingBox()).y,
        results: await page.locator("#document-search-results a").count(),
      });
    }
    const spread =
      Math.max(...measurements.map((x) => x.y)) -
      Math.min(...measurements.map((x) => x.y));
    console.log(JSON.stringify({ width, spread, measurements }));
    if (!baseline) {
      assert.ok(
        spread < 1,
        "Result height must not recenter the search dialog",
      );
      await page.evaluate(() => {
        Object.defineProperty(visualViewport, "height", {
          configurable: true,
          get: () => 280,
        });
        Object.defineProperty(visualViewport, "offsetTop", {
          configurable: true,
          get: () => 80,
        });
        visualViewport.dispatchEvent(new Event("resize"));
      });
      const positions = [];
      for (const value of ["", "Chip", "Chi", "none-xxxx"]) {
        await input.fill(value);
        await page.waitForTimeout(40);
        positions.push((await panel.boundingBox()).y);
        const box = await input.boundingBox();
        if (await page.locator("#document-search-results a").count())
          assert.ok(
            (await page.locator("#document-search-results").boundingBox())
              .height >= 44,
            "Keyboard viewport still leaves a usable result row",
          );
        assert.ok(
          box.y >= 80 && box.y + box.height <= 360,
          "Input remains inside keyboard-reduced viewport",
        );
      }
      assert.ok(Math.max(...positions) - Math.min(...positions) < 1);
      await page.evaluate(() => {
        Object.defineProperty(visualViewport, "height", {
          configurable: true,
          get: () => 236,
        });
        visualViewport.dispatchEvent(new Event("resize"));
      });
      await input.fill("Chi");
      assert.ok(
        (await page.locator("#document-search-results").boundingBox()).height >=
          44,
        "Very short keyboard viewport retains result space",
      );
      await input.fill("Chip");
      await input.press("ArrowDown");
      assert.equal(
        await page
          .locator("#document-search-results a")
          .first()
          .evaluate((el) => document.activeElement === el),
        true,
      );
      await page.screenshot({ path: resolve(out, `search-${width}.png`) });
      await page.keyboard.press("Escape");
      assert.equal(
        await page
          .locator("#document-search-open")
          .evaluate((el) => document.activeElement === el),
        true,
      );
      await page.locator("#document-search-open").click();
      await input.fill("Chip");
      await page.locator("#document-search-results a").first().click();
      assert.equal(await panel.isVisible(), false);
      assert.match(page.url(), /#component\/schip$/);
    }
    records.push({ width, spread, measurements });
    await context.close();
  }
  if (!baseline)
    for (const theme of ["violet", "sage", "sand"])
      for (const mode of ["light", "dark"]) {
        const context = await browser.newContext({
            viewport: { width: 475, height: 800 },
          }),
          page = await context.newPage();
        await page.goto(
          origin +
            "/?" +
            new URLSearchParams({ theme, mode }) +
            "#component/sbadge",
        );
        const card = page.locator("#sbadge");
        await card.scrollIntoViewIfNeeded();
        const surface = (await card.locator("iframe").count())
          ? card.frameLocator("iframe")
          : card;
        const outlined = surface.locator(
          '.sol-ui-badge[data-variant="outlined"]',
        );
        await outlined.waitFor();
        const style = await outlined.evaluate((el) => {
          const s = getComputedStyle(el);
          return {
            border: s.borderTopWidth,
            color: s.borderTopColor,
            text: s.color,
            role: el.getAttribute("role"),
            tag: el.tagName,
          };
        });
        assert.equal(style.border, "1px");
        assert.equal(style.color, style.text);
        assert.notEqual(style.tag, "BUTTON");
        assert.notEqual(style.role, "button");
        assert.equal(
          await surface
            .locator('.sol-ui-badge[data-variant="subtle"]')
            .first()
            .evaluate((el) => getComputedStyle(el).borderTopWidth),
          "0px",
        );
        await page.screenshot({
          path: resolve(out, `badge-${theme}-${mode}.png`),
        });
        records.push({ theme, mode, badge: style });
        await context.close();
      }
  await writeFile(
    resolve(
      out,
      baseline
        ? "baseline.json"
        : process.argv.includes("--public")
          ? "public-result.json"
          : "result.json",
    ),
    JSON.stringify(
      { visualViewportSimulated: true, physicalAndroid: false, records },
      null,
      2,
    ),
  );
} finally {
  await browser?.close();
  await new Promise((r) => server.close(r));
}
