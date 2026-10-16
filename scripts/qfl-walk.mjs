import { chromium } from "playwright";

const url = process.argv[2] || "http://127.0.0.1:8080/";
const out = process.argv[3] || "/workspace/screenshots/qfl-now.png";

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.setDefaultTimeout(20000);
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});

await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(400);
const title = await page.locator("h1").first().innerText();
await page.screenshot({ path: out, fullPage: false });

const clicks = [
  ["Raft", "spec"],
  ["tlc", null],
  ["exec", null],
  ["Paxos", "spec"],
  ["tlc", null],
  ["exec", null],
  ["Multi-Paxos", "spec"],
  ["exec", null],
  ["Mapping", null],
  ["Kernel", null],
  ["Byzantine", "spec"],
  ["exec", null],
  ["Quantum", null],
  ["Mesa / Löb", null],
];

const shots = [];
for (const [a, b] of clicks) {
  await page.getByRole("button", { name: a, exact: true }).first().click();
  await page.waitForTimeout(250);
  if (b) {
    const sub = page.getByRole("button", { name: b, exact: true });
    if (await sub.count()) await sub.first().click();
    await page.waitForTimeout(200);
  }
  const text = (await page.locator("body").innerText()).slice(0, 80).replace(/\s+/g, " ");
  const file = `/workspace/screenshots/qfl-${a.replace(/\s+/g, "-").toLowerCase()}${b ? "-" + b : ""}.png`;
  await page.screenshot({ path: file, fullPage: false });
  shots.push({ a, b, text, file });
}

if (title.includes("Raft")) {
  await page.getByRole("button", { name: "exec", exact: true }).click();
  await page.waitForTimeout(200);
  const propose = page.getByRole("button", { name: "Propose", exact: true });
  if (await propose.count()) {
    await propose.click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: "/workspace/screenshots/qfl-raft-propose.png" });
  }
}

await page.getByRole("button", { name: "Paxos", exact: true }).click();
await page.getByRole("button", { name: "exec", exact: true }).click();
const run = page.getByRole("button", { name: "Run to Chosen" });
if (await run.count()) {
  await run.click();
  await page.waitForTimeout(200);
  await page.screenshot({ path: "/workspace/screenshots/qfl-paxos-chosen.png" });
}

await page.getByRole("button", { name: "Paxos", exact: true }).click();
await page.getByRole("button", { name: "tlc", exact: true }).click();
const skip = page.getByRole("button", { name: "skip force-value" });
if (await skip.count()) {
  await skip.click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: "/workspace/screenshots/qfl-paxos-tlc-mut.png" });
}

await browser.close();
console.log(JSON.stringify({ title, errors, shots: shots.map((s) => ({ a: s.a, b: s.b, text: s.text })) }, null, 2));
