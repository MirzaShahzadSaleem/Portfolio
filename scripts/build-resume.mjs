// Builds public/Shahzad-Saleem-Resume.pdf from src/data/content.js, so the CV and the site never drift apart.
// Usage: npm run resume   (set CHROME_PATH if Chrome isn't in the default macOS location)
// Helvetica Neue embeds as plain TrueType, which applicant-tracking systems parse more reliably than web fonts.
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { profile, experience, projects, skills, marketplaces, cv, education, certifications } from "../src/data/content.js";

const CHROME = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = fileURLToPath(new URL(`../public${profile.resume}`, import.meta.url));

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const list = (items, cls = "") => `<ul class="${cls}">${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
const bare = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
const period = (p) => p.replace(" — ", " – ");
const keep = (items) => items.map((i) => i.replace(/ /g, "\u00a0"));

const market = (m) => `
  <div class="market">
    <h4>${esc(m.title)} <span>· ${esc(m.audience)}</span></h4>
    <ul>${m.modules.map((x) => `<li><b>${esc(x.name)}:</b> ${esc(x.detail)}</li>`).join("")}</ul>
  </div>`;

const job = (j, i) => {
  // The current role gets the marketplace breakdown in place of its one-line B2C/B2B summaries.
  const points = i === 0 ? j.points.filter((p) => !/^B2[BC]:/.test(p)) : j.points;
  const [lead, ...rest] = points;
  return `
  <article class="job">
    <header>
      <h3>${esc(j.role)} <span>· ${esc(j.company)}${j.place ? `, ${esc(j.place)}` : ""}</span></h3>
      <time>${esc(period(j.period))}</time>
    </header>
    ${i === 0 ? `${list([lead])}${marketplaces.items.map(market).join("")}${list(rest)}` : list(points)}
  </article>`;
};

const project = (p) => `
  <div class="project">
    <h4>${esc(p.title)} <span>· ${esc(p.type)}</span></h4>
    <p>${esc(p.description)}</p>
    <p class="stack">${esc(keep(p.stack).join(" · "))}</p>
  </div>`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${esc(profile.name)} — Résumé</title>
<style>
  @page { size: A4; margin: 14mm 15mm; }
  * { box-sizing: border-box; }
  body { margin: 0; color: #2b2d42; font: 9.8pt/1.45 "Helvetica Neue", Arial, sans-serif; }
  h1, h2, h3, h4, p, ul { margin: 0; padding: 0; }
  ul { list-style: none; }
  a { color: inherit; text-decoration: none; }

  .top { display: flex; justify-content: space-between; align-items: flex-end; gap: 20px; padding-bottom: 12px; border-bottom: 2px solid #5b5bf7; }
  h1 { font-size: 25pt; line-height: 1.05; letter-spacing: -0.02em; color: #1a1b2e; }
  .headline { margin-top: 5px; font-size: 11.5pt; font-weight: 600; color: #5b5bf7; }
  .contact { display: grid; gap: 1px; text-align: right; font-size: 8.8pt; color: #4b4e66; }

  section { margin-top: 13px; }
  h2 { margin-bottom: 7px; font-size: 8.8pt; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: #5b5bf7; }
  .summary { color: #3f4257; }
  .expertise { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px 14px; }
  .expertise li, .points li, .job li { position: relative; padding-left: 11px; }
  .expertise li::before, .job li::before { content: ""; position: absolute; left: 0; top: 0.62em; width: 4px; height: 4px; border-radius: 50%; background: #5b5bf7; }

  .job { margin-bottom: 10px; break-inside: avoid-page; }
  .job header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; margin-bottom: 3px; }
  h3 { font-size: 10.4pt; color: #1a1b2e; }
  h3 span, h4 span { font-weight: 500; color: #4b4e66; }
  time { flex: none; font-size: 8.8pt; font-weight: 600; color: #6b6f85; }
  .job li { margin-bottom: 2px; }
  .market { margin: 5px 0 6px; padding: 7px 10px 6px; border-left: 2px solid #c9c3ff; background: #f6f5fd; break-inside: avoid; }
  .market h4 { margin-bottom: 3px; font-size: 9.6pt; color: #1a1b2e; }
  .market li { font-size: 9.2pt; }
  .market li b { color: #1a1b2e; }

  .projects { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 18px; }
  .project { break-inside: avoid; }
  .project h4 { font-size: 9.6pt; color: #1a1b2e; }
  .project p { font-size: 9pt; }
  .stack { margin-top: 1px; font-weight: 600; color: #5b5bf7; }

  .skills { display: grid; grid-template-columns: max-content 1fr; gap: 3px 14px; }
  .skills dt { font-weight: 700; color: #1a1b2e; }
  .skills dd { margin: 0; }
  .split { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; break-inside: avoid; }
  .edu li { margin-bottom: 4px; }
  .edu b { display: block; color: #1a1b2e; }
  .edu span { font-size: 9pt; color: #4b4e66; }
  .certs li { position: relative; padding-left: 11px; margin-bottom: 2px; }
  .certs li::before { content: ""; position: absolute; left: 0; top: 0.62em; width: 4px; height: 4px; border-radius: 50%; background: #5b5bf7; }
</style>
</head>
<body>
  <header class="top">
    <div>
      <h1>${esc(profile.name)}</h1>
      <p class="headline">${esc(profile.role)} · ${esc(profile.years)} years</p>
    </div>
    <div class="contact">
      <span>${esc(profile.phone)} · ${esc(profile.location)}</span>
      <a href="mailto:${profile.email}">${esc(profile.email)}</a>
      <a href="${profile.github}">${esc(bare(profile.github))}</a>
      <a href="${profile.linkedin}">${esc(bare(profile.linkedin))}</a>
    </div>
  </header>

  <section>
    <h2>Professional summary</h2>
    <p class="summary">${esc(cv.summary)}</p>
  </section>

  <section>
    <h2>Core expertise</h2>
    ${list(cv.expertise, "expertise")}
  </section>

  <section>
    <h2>Professional experience</h2>
    ${experience.map(job).join("")}
  </section>

  <section>
    <h2>Key projects</h2>
    <div class="projects">${projects.filter((p) => !p.current).map(project).join("")}</div>
  </section>

  <section>
    <h2>Technical skills</h2>
    <dl class="skills">
      ${skills.map((g) => `<dt>${esc(g.group)}</dt><dd>${esc(keep(g.items).join(", "))}</dd>`).join("")}
    </dl>
  </section>

  <section class="split">
    <div>
      <h2>Education</h2>
      <ul class="edu">${education.map((e) => `<li><b>${esc(e.title)}</b><span>${esc(e.place)} · ${esc(period(e.period))}</span></li>`).join("")}</ul>
    </div>
    <div>
      <h2>Certifications</h2>
      ${list(certifications, "certs")}
    </div>
  </section>
</body>
</html>`;

const dir = mkdtempSync(join(tmpdir(), "resume-"));
const page = join(dir, "resume.html");
writeFileSync(page, html);
try {
  execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${OUT}`, `file://${page}`], { stdio: "ignore" });
  console.log(`Wrote ${OUT}`);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
