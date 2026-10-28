import React from "react";
import Section from "./Section";
import { experience } from "../data/content";

export default function Experience() {
  return (
    <Section id="experience" label="⌘ experience" title="Where I've worked">
      <ol className="jobs">
        {experience.map((job, i) => (
          <li key={job.company + job.period} className="panel job" style={{ "--i": i }}>
            <span className="period mono">{job.period}</span>
            <div>
              <h3>{job.role} <span>@ {job.company}</span></h3>
              {job.place && <p className="place">{job.place}</p>}
              <ul className="points">
                {job.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
              {job.stack.length > 0 && (
                <ul className="chips">
                  {job.stack.map((s) => <li key={s}>{s}</li>)}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
