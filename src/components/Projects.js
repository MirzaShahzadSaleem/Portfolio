import React from "react";
import Section from "./Section";
import { projects } from "../data/content";

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <ul className="cards">
        {projects.map((p, i) => (
          <li key={p.title} className="card" style={{ "--i": i }}>
            <p className="card-meta">{p.type}</p>
            <div>
              <h3 className="card-title">{p.title}</h3>
              <p className="card-text">{p.description}</p>
              <ul className="tags">
                {p.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
