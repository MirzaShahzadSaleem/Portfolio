import React from "react";
import Section from "./Section";
import Icon from "./Icons";
import { experience, profile } from "../data/content";

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="cards">
        {experience.map((job, i) => (
          <li key={job.company + job.period} className="card" style={{ "--i": i }}>
            <p className="card-meta">{job.period}</p>
            <div>
              <h3 className="card-title">
                {job.role} · <span>{job.company}</span>
              </h3>
              {job.place && <p className="card-sub">{job.place}</p>}
              <ul className="points">
                {job.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              {job.stack.length > 0 && (
                <ul className="tags">
                  {job.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
      <a className="more" href={profile.resume} target="_blank" rel="noreferrer">
        View full résumé <Icon name="arrow" size={16} />
      </a>
    </Section>
  );
}
