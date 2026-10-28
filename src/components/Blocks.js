import React, { useState } from "react";
import db from "../firebase";
import { emailConfigured, sendNotification } from "../email";
import { profile, experience, projects, skills, education, certifications, marketplaces } from "../data/content";

const HUES = [255, 160, 25, 210, 330, 190, 45];

export function Chips({ items }) {
  return (
    <ul className="chips">
      {items.map((c) => <li key={c}>{c}</li>)}
    </ul>
  );
}

export function ProjectCards({ onAsk }) {
  return (
    <div className="cards">
      {projects.map((p, i) => (
        <button key={p.title} className="card" style={{ "--h": HUES[i % HUES.length] }} onClick={() => onAsk(`Tell me about the ${p.title}`)}>
          <span className="card-dot" />
          {p.current && <em className="now card-now">Now</em>}
          <small>{p.type}</small>
          <b>{p.title}</b>
          <span className="card-stack">{p.stack.slice(0, 3).join(" · ")}</span>
          <span className="card-more">Ask about it →</span>
        </button>
      ))}
    </div>
  );
}

function Modules({ items }) {
  return (
    <ul className="points modules">
      {items.map((m) => (
        <li key={m.name}>
          <b>{m.name}</b>
          <span>{m.detail}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProjectDetail({ project }) {
  return (
    <div className="detail">
      {project.audience && <span className="detail-label">Core modules · for {project.audience.toLowerCase()}</span>}
      {project.modules && <Modules items={project.modules} />}
      <span className="detail-label">Built with</span>
      <Chips items={project.stack} />
    </div>
  );
}

export function Jobs({ onAsk }) {
  return (
    <ol className="jobs">
      {experience.map((j, i) => (
        <li key={j.company + j.period}>
          <button onClick={() => onAsk(`Tell me about his role at ${j.company}`)}>
            <span className="job-period">{j.period}</span>
            <span className="job-main">
              <b>{j.company}</b>
              <span>{j.role}{j.place ? ` · ${j.place}` : ""}</span>
            </span>
            {i === 0 && <em className="now">Now</em>}
            <span className="arrow" aria-hidden="true">→</span>
          </button>
        </li>
      ))}
    </ol>
  );
}

export function Now() {
  const job = experience[0];
  return (
    <div className="detail">
      <div className="markets">
        {marketplaces.items.map((m, i) => (
          <section key={m.title} className="market" style={{ "--h": HUES[i] }}>
            <small>{m.audience}</small>
            <b>{m.title}</b>
            <p>{m.description}</p>
            <Modules items={m.modules} />
          </section>
        ))}
      </div>
      <span className="detail-label">Across both</span>
      <ul className="points">
        {marketplaces.shared.map((p) => <li key={p}>{p}</li>)}
      </ul>
      <Chips items={job.stack} />
    </div>
  );
}

export function JobDetail({ job }) {
  return (
    <div className="detail">
      <ul className="points">
        {job.points.map((p) => <li key={p}>{p}</li>)}
      </ul>
      {job.stack.length > 0 && <Chips items={job.stack} />}
    </div>
  );
}

export function Skills() {
  return (
    <div className="skills">
      {skills.map((g) => (
        <div key={g.group}>
          <span className="detail-label">{g.group}</span>
          <Chips items={g.items} />
        </div>
      ))}
    </div>
  );
}

export function Education() {
  return (
    <div className="edu">
      {education.map((e) => (
        <div key={e.title} className="edu-row">
          <b>{e.title}</b>
          <span>{e.place} · {e.period}</span>
        </div>
      ))}
      <span className="detail-label">Certifications</span>
      <ul className="certs">
        {certifications.map((c) => <li key={c}>{c}</li>)}
      </ul>
    </div>
  );
}

export function ResumeCard() {
  return (
    <div className="resume">
      <div className="file-icon" aria-hidden="true">PDF</div>
      <div>
        <b>{profile.resume.replace("/", "")}</b>
        <span>{profile.name} · {profile.role}</span>
      </div>
      <div className="resume-actions">
        <a className="btn" href={profile.resume} download>Download</a>
        <a className="btn ghost" href={profile.resume} target="_blank" rel="noreferrer">Open</a>
      </div>
    </div>
  );
}

const EMPTY = { name: "", email: "", message: "" };

export function ContactCard() {
  const [form, setForm] = useState(EMPTY);
  const [trap, setTrap] = useState("");
  const [status, setStatus] = useState({ state: "idle", text: "" });

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    try {
      await db.firestore().collection("Contact").add({ ...form, createdAt: new Date().toISOString() });
    } catch (error) {
      throw new Error(`save: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (trap) return setStatus({ state: "ok", text: "Message sent! He'll get back to you soon." });
    setStatus({ state: "sending", text: "" });
    // Run both so one failing doesn't lose the message; it only fails if neither worked.
    const jobs = [save(), emailConfigured ? sendNotification(form) : Promise.reject(new Error("email not configured"))];
    const results = await Promise.allSettled(jobs);
    if (results.some((r) => r.status === "fulfilled")) {
      setStatus({ state: "ok", text: "Message sent! He'll get back to you soon." });
      setForm(EMPTY);
    } else {
      setStatus({ state: "error", text: "Sorry, that didn't send. Please email him directly instead." });
    }
  };

  return (
    <div className="contact">
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="row">
          <input name="name" placeholder="Your name" value={form.name} onChange={update} required autoComplete="name" aria-label="Your name" />
          <input type="email" name="email" placeholder="Your email" value={form.email} onChange={update} required autoComplete="email" aria-label="Your email" />
        </div>
        <input name="website" value={trap} onChange={(e) => setTrap(e.target.value)} className="trap" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <textarea name="message" rows="3" placeholder="Your message" value={form.message} onChange={update} required aria-label="Your message" />
        <button className="btn" type="submit" disabled={status.state === "sending"}>
          {status.state === "sending" ? "Sending…" : "Send message"}
        </button>
        {status.text && <p className={`form-status ${status.state}`} role="status">{status.text}</p>}
      </form>
      <div className="contact-links">
        <a className="btn ghost" href={`mailto:${profile.email}`}>✉ {profile.email}</a>
        <a className="btn ghost" href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        <a className="btn ghost" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
      </div>
    </div>
  );
}

export function Rich({ kind, data, onAsk }) {
  switch (kind) {
    case "chips": return <Chips items={data} />;
    case "projects": return <ProjectCards onAsk={onAsk} />;
    case "project": return <ProjectDetail project={data} />;
    case "jobs": return <Jobs onAsk={onAsk} />;
    case "job": return <JobDetail job={data} />;
    case "now": return <Now />;
    case "skills": return <Skills />;
    case "education": return <Education />;
    case "resume": return <ResumeCard />;
    case "contact": return <ContactCard />;
    default: return null;
  }
}
