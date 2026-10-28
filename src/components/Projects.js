import React from "react";
import Section from "./Section";
import { projects } from "../data/content";

export default function Projects() {
  return (
    <Section id="projects" label="⌘ projects" title="Things I've built">
      <div className="grid">
        {projects.map((p, i) => (
          <article key={p.title} className="panel project" style={{ "--i": i }}>
            <div className="project-top">
              <span className="mono">⌘ {String(i + 1).padStart(2, "0")}</span>
              <span className="type">{p.type}</span>
            </div>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <ul className="chips">
              {p.stack.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
