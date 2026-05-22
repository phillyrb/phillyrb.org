// Accessibility test runner for the Middleman build output.
// Uses Puppeteer + axe-core directly so we can filter out axe "incomplete"
// results that the bundled `pa11y` v6 surfaces as hard errors.
// We treat ONLY axe `violations` as failures; `incomplete` is reported as
// informational. axe v4 returns "incomplete" for color-contrast checks against
// element-overlap or background-images even when the actual rendered contrast
// is fine — they're not real violations.

const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const axeSource = fs.readFileSync(
  require.resolve("axe-core/axe.min.js"),
  "utf8"
);

const PORT = process.env.A11Y_PORT || "8765";
const HOST = `http://localhost:${PORT}`;

// Load URL list from .pa11yci.json so config stays in one place.
const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", ".pa11yci.json"), "utf8")
);
const urls = (config.urls || []).map((u) =>
  u.replace(/^http:\/\/localhost:\d+/, HOST)
);

function color(code, str) {
  if (!process.stdout.isTTY) return str;
  return `\x1b[${code}m${str}\x1b[0m`;
}
const red = (s) => color(31, s);
const green = (s) => color(32, s);
const yellow = (s) => color(33, s);
const dim = (s) => color(2, s);

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--force-prefers-reduced-motion",
    ],
  });

  let totalViolations = 0;
  let totalIncomplete = 0;
  const failingUrls = [];

  for (const url of urls) {
    console.log(`\n→ ${url}`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 1000));
    await page.evaluate(axeSource);
    const results = await page.evaluate(async () =>
      // eslint-disable-next-line no-undef
      await axe.run(document, {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag21a", "wcag2aa", "wcag21aa"],
        },
      })
    );
    await page.close();

    const violations = results.violations || [];
    const incomplete = results.incomplete || [];

    if (violations.length === 0) {
      console.log(green("  ✓ 0 violations"));
    } else {
      failingUrls.push(url);
      for (const v of violations) {
        console.log(red(`  ✗ ${v.id} [${v.impact}] — ${v.help}`));
        console.log(dim(`    ${v.helpUrl}`));
        for (const node of v.nodes) {
          console.log(`    • ${node.target.join(" ")}`);
          if (node.failureSummary) {
            console.log(
              dim(
                `      ${node.failureSummary
                  .replace(/\s+/g, " ")
                  .slice(0, 220)}`
              )
            );
          }
        }
        totalViolations += v.nodes.length;
      }
    }

    if (incomplete.length > 0) {
      const incompleteCount = incomplete.reduce(
        (sum, i) => sum + i.nodes.length,
        0
      );
      totalIncomplete += incompleteCount;
      console.log(
        yellow(
          `  ! ${incompleteCount} incomplete (manual review; not blocking)`
        )
      );
      for (const i of incomplete) {
        console.log(dim(`    - ${i.id}: ${i.nodes.length} node(s)`));
      }
    }
  }

  await browser.close();

  console.log("\n────────────────────────────────────────");
  console.log(
    `URLs checked: ${urls.length}   violations: ${totalViolations}   incomplete: ${totalIncomplete}`
  );
  if (totalViolations === 0) {
    console.log(green("Accessibility check passed."));
    process.exit(0);
  } else {
    console.log(
      red(`Accessibility check FAILED on ${failingUrls.length} URL(s).`)
    );
    process.exit(1);
  }
})().catch((err) => {
  console.error("a11y runner crashed:", err);
  process.exit(2);
});
