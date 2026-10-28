import React from "react";
import { QUESTIONS } from "../chat/answers";
import { profile, experience } from "../data/content";

const TOPICS = [
  ["about", "About"],
  ["now", "Right now"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["skills", "Tech stack"],
  ["education", "Education"],
  ["resume", "Résumé"],
  ["contact", "Contact"],
];

export default function Sidebar({ onAsk, busy }) {
  return (
    <aside className="side">
      <div className="profile">
        <div className="avatar" aria-hidden="true">SS</div>
        <div>
          <h1>{profile.name}</h1>
          <p className="role">{profile.role} · {profile.years} years</p>
        </div>
      </div>
      <p className="status"><i aria-hidden="true" /> Open to opportunities</p>
      <p className="now-at">Building B2C and B2B marketplaces at <b>{experience[0].company}</b></p>
      <div className="links">
        <a href={profile.resume} download>Résumé ↓</a>
        <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={`mailto:${profile.email}`}>Email</a>
      </div>
      <nav className="topics" aria-label="Topics">
        <p>Ask about</p>
        {TOPICS.map(([key, label]) => (
          <button key={key} onClick={() => onAsk(QUESTIONS[key])} disabled={busy}>
            {label}
            <span aria-hidden="true">→</span>
          </button>
        ))}
      </nav>
      <p className="note">Answers come straight from Shahzad's résumé.</p>
    </aside>
  );
}
