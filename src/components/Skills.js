import React from "react";
import Section from "./Section";
import { skills } from "../data/content";

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <dl className="skills">
        {skills.map((g, i) => (
          <div key={g.group} className="skill-row" style={{ "--i": i }}>
            <dt>{g.group}</dt>
            <dd>
              <ul className="tags">
                {g.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
