import React from "react";
import Section from "./Section";
import { profile, education, certifications } from "../data/content";

export default function About() {
  return (
    <Section id="about" label="⌘ about" title="A little about me">
      <div className="about">
        <div className="about-text">
          {profile.summary.map((p) => <p key={p}>{p}</p>)}
        </div>
        <div className="about-side">
          <div className="panel">
            <h3>Education</h3>
            {education.map((e) => (
              <div key={e.title} className="edu">
                <strong>{e.title}</strong>
                <span>{e.place} · {e.period}</span>
              </div>
            ))}
          </div>
          <div className="panel">
            <h3>Certifications</h3>
            <ul className="certs">
              {certifications.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
