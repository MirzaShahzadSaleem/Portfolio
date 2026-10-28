import { profile, experience, projects, marketplaces } from "../data/content";

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
    return reply("projects", `Here are ${projects.length} products he's worked on. Tap one to learn more:`, "projects");
  }
  if (/experience|worked|work|job|career|compan|employ/.test(t)) {
    return reply("experience", `He has ${profile.years} years of experience across ${experience.length} roles. Tap one for details:`, "jobs");
  }
  if (/who|about|yourself|introduce|shahzad|background/.test(t)) {
    return reply("about", `${profile.summary[0]} ${profile.summary[1]}`, "chips", [
      `${profile.years} years experience`,
      "Language-agnostic",
      "B2C + B2B marketplaces",
      "Full-stack, web + mobile",
      "Open to opportunities",
    ]);
  }
  if (/^ (hi|hello|hey|salam|yo) /.test(t)) return greeting();
  return reply("fallback", "I can only answer questions about Shahzad's work. Try one of these:");
}
