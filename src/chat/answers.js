import { profile, experience, projects, marketplaces } from "../data/content";
import { KNOWLEDGE, OTHER_TECH, HIGHLIGHTS } from "./knowledge";

export const QUESTIONS = {
  about: "Who is Shahzad?",
  now: "What is he working on now?",
  experience: "Where has he worked?",
  projects: "Show me his projects",
  skills: "What's his tech stack?",
  education: "What's his education?",
  resume: "Can I see his resume?",
  contact: "How can I contact him?",
};

const FOLLOW = {
  greeting: ["about", "now", "projects", "skills"],
  about: ["now", "projects", "contact"],
  now: ["experience", "projects", "contact"],
  market: ["now", "contact"],
  experience: ["projects", "skills", "resume"],
  job: ["experience", "projects", "contact"],
  projects: ["skills", "experience", "contact"],
  project: ["projects", "skills", "contact"],
  skills: ["projects", "education", "contact"],
  education: ["experience", "skills", "resume"],
  resume: ["contact", "projects", "about"],
  contact: ["about", "projects", "resume"],
  fallback: ["about", "projects", "experience", "contact"],
};

const STOP = new Set(["the", "a", "an", "platform", "portal", "app", "application", "advanced", "website", "data", "pk", "of", "tech", "marketplace"]);
const words = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().split(" ").filter((w) => w && !STOP.has(w));
const norm = (s) => ` ${s.toLowerCase().replace(/[^a-z0-9+]+/g, " ")} `;

function best(list, keyOf, text) {
  let pick = null;
  let score = 0;
  list.forEach((item) => {
    const s = words(keyOf(item)).filter((w) => text.includes(` ${w} `)).length;
    if (s > score) {
      score = s;
      pick = item;
    }
  });
  return pick;
}

const TYPE_PHRASE = { "web & mobile": "a web and mobile product", website: "a website", "mobile application": "a mobile app" };
const typePhrase = (type) => TYPE_PHRASE[type.toLowerCase()] || `a ${type.toLowerCase()}`;

const reply = (intent, text, kind, data) => ({ intent, text, kind, data, follow: FOLLOW[intent].map((k) => QUESTIONS[k]) });

export const greeting = () =>
  reply(
    "greeting",
    `Hi! 👋 I'm Shahzad's portfolio assistant. He's a language-agnostic software engineer with ${profile.years} years of experience, currently building B2C and B2B marketplaces. I answer from his résumé, so ask me about his work, projects, skills, or how to get in touch.`
  );

const FIRST_TOPIC = KNOWLEDGE.findIndex((e) => e.topic);
let highlight = 0;

const kb = (e) => ({ intent: "kb", text: e.a, kind: e.kind, data: e.data, follow: (e.follow || FOLLOW.fallback).map((k) => QUESTIONS[k]) });

// Answers from the knowledge base: early practical entries first, then up to two matching topics combined.
function lookup(input) {
  const raw = ` ${input.toLowerCase()} `;
  const hits = KNOWLEDGE.filter((e) => e.q.test(raw));
  if (hits[0]?.offTopic) return "off-topic";
  if (hits[0] && !hits[0].topic && KNOWLEDGE.indexOf(hits[0]) < FIRST_TOPIC) return kb(hits[0]);

  const other = OTHER_TECH.filter(([q]) => q.test(raw)).map(([, name, closest]) => ({
    a: `${name} isn't on his résumé, but he's language-agnostic. ${closest}`,
    follow: ["skills", "contact"],
  }));
  const parts = [...hits.filter((e) => e.topic), ...other].slice(0, 2);
  if (parts.length) {
    const chips = [...new Set(parts.flatMap((e) => (e.kind === "chips" ? e.data : [])))];
    return kb({ a: parts.map((e) => e.a).join(" "), kind: chips.length ? "chips" : parts[0].kind, data: chips.length ? chips : parts[0].data, follow: parts[0].follow });
  }
  return hits[0] ? kb(hits[0]) : null;
}

function fallback() {
  const fact = HIGHLIGHTS[highlight++ % HIGHLIGHTS.length];
  return reply("fallback", `That one's outside what I know, since I only know Shahzad's story. But here's something worth knowing: ${fact} Want to hear more?`);
}

export function answer(input) {
  const t = norm(input);
  const current = experience[0];

  const both = /b2b/.test(t) && /b2c/.test(t);
  const project = !both && best(projects, (p) => p.title, t);
  if (project?.current) {
    const other = marketplaces.items.find((m) => m !== project);
    const r = reply("market", `The ${project.title} is one of the two marketplaces he's building right now at ${current.company}. ${project.description}`, "project", project);
    return { ...r, follow: [`Tell me about the ${other.title}`, ...r.follow] };
  }
  if (project) {
    return reply("project", `${project.title} is ${typePhrase(project.type)}. ${project.description}`, "project", project);
  }
  const job = best(experience, (j) => j.company, t);
  if (job) {
    const where = job.place ? ` in ${job.place}` : "";
    return reply("job", `${job.role} at ${job.company}${where}, ${job.period.replace("—", "to")}.`, "job", job);
  }

  const known = lookup(input);
  if (known === "off-topic") return fallback();
  if (known) return known;

  if (/contact|email|reach|hire|message|talk|touch/.test(t)) {
    return reply("contact", "He'd love to hear from you. Leave a message right here, or email him directly:", "contact");
  }
  if (/resume|r sum | cv |pdf/.test(t)) return reply("resume", "Sure, here's his latest résumé:", "resume");
  if (/ now |current|today|these days|marketplace|commerce|b2b|b2c|wholesale/.test(t)) {
    const since = current.period.split(" — ")[0];
    return reply(
      "now",
      `He's a ${current.role} at ${current.company} (${current.place}) since ${since}, building two marketplaces end to end: a multi-vendor B2C marketplace for shoppers and sellers, and a B2B wholesale marketplace for business buyers and suppliers. ${marketplaces.summary}`,
      "now"
    );
  }
  if (/educat|degree|universit|stud|certif|course/.test(t)) {
    return reply("education", "His education and certifications:", "education");
  }
  if (/stack|skill|tech|language|agnostic|framework|tool| know /.test(t)) {
    return reply("skills", "He's language-agnostic, so the stack follows the problem. These are the tools he's shipped with most:", "skills");
  }
  if (/project|built|build|made|portfolio/.test(t)) {
    return reply("projects", `He's shipped ${profile.shipped} live, production-ready projects. Here are ${projects.length} highlights; tap one to learn more:`, "projects");
  }
  if (/experience|worked|work|job|career|compan|employ/.test(t)) {
    return reply("experience", `He has ${profile.years} years of experience across ${experience.length} roles. Tap one for details:`, "jobs");
  }
  if (/who|about|yourself|introduce|shahzad|background/.test(t)) {
    return reply("about", `${profile.summary[0]} ${profile.summary[1]}`, "chips", [
      `${profile.years} years experience`,
      `${profile.shipped} live projects`,
      "Language-agnostic",
      "B2C + B2B marketplaces",
      "Full-stack, web + mobile",
      "Open to opportunities",
    ]);
  }
  if (/^ (hi|hello|hey|salam|yo) /.test(t)) return greeting();
  return fallback();
}
