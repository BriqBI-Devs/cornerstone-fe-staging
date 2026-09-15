import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const errors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
page.on("pageerror", (err) => errors.push(err.message));

await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await page.waitForSelector("text=Good morning, Jordan");
await page.screenshot({ path: "screenshot-home.png", fullPage: true });

console.log("Console errors:", errors.length ? errors : "none");
await browser.close();
