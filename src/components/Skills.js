import React from "react";
import Section from "./Section";
import { skills } from "../data/content";

export default function Skills() {
  return (
    <Section id="skills" label="⌘ skills" title="My toolkit">
      <div className="skills">
        {skills.map((g) => (
          <div key={g.group} className="skill-group">
            <h3>{g.group}</h3>
            <div className="minikeys">
              {g.items.map((s) => (
                <span key={s} className="minikey">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
