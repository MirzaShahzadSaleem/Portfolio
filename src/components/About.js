import React from "react";
import Section from "./Section";
import { profile, education, certifications } from "../data/content";

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="prose">
        {profile.summary.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <div className="about-meta">
        <div>
          <h3>Education</h3>
          <ul>
            {education.map((e) => (
              <li key={e.title}>
                <strong>{e.title}</strong>
                <span>{e.place} · {e.period}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Certifications</h3>
          <ul className="certs">
            {certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
