import { profile, experience, projects } from "../data/content";

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
  greeting: ["about", "projects", "experience", "skills"],
  about: ["projects", "now", "contact"],
  now: ["experience", "projects", "contact"],
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

const STOP = new Set(["the", "a", "an", "platform", "portal", "app", "application", "advanced", "website", "data", "pk", "of", "tech"]);
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
    "Hi! 👋 I'm Shahzad's portfolio assistant. I answer from his résumé, so ask me about his projects, experience, skills, or how to get in touch."
  );

export function answer(input) {
  const t = norm(input);
  const current = experience[0];

  const project = best(projects, (p) => p.title, t);
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
  if (/ now |current|today|these days/.test(t)) {
    return reply("now", `He's currently a ${current.role} at ${current.company} in ${current.place}, since ${current.period.split(" — ")[0]}.`, "job", current);
  }
  if (/educat|degree|universit|stud|certif|course/.test(t)) {
    return reply("education", "His education and certifications:", "education");
  }
  if (/stack|skill|tech|language|framework|tool| know /.test(t)) {
    return reply("skills", "Here's his toolkit, grouped by area:", "skills");
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
      "Full-stack",
      "Web + mobile",
      "Open to opportunities",
    ]);
  }
  if (/^ (hi|hello|hey|salam|yo) /.test(t)) return greeting();
  return reply("fallback", "I can only answer questions about Shahzad's work. Try one of these:");
}
