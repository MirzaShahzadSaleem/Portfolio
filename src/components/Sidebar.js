import React, { useEffect, useState } from "react";
import Icon from "./Icons";
import { profile } from "../data/content";

export const SECTIONS = [
  ["about", "About"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["skills", "Skills"],
  ["contact", "Contact"],
];

export default function Sidebar() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SECTIONS.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const socials = [
    ["github", "GitHub", profile.github],
    ["linkedin", "LinkedIn", profile.linkedin],
    ["mail", "Email", `mailto:${profile.email}`],
    ["file", "Resume", profile.resume],
  ];

  return (
    <header className="sidebar">
      <div>
        <h1 className="name intro" style={{ "--i": 0 }}>
          <a href="#about">{profile.name}</a>
        </h1>
        <p className="role intro" style={{ "--i": 1 }}>{profile.role}</p>
        <p className="tagline intro" style={{ "--i": 2 }}>{profile.tagline}</p>
        <p className="status intro" style={{ "--i": 3 }}>
          <i aria-hidden="true" /> Open to new opportunities
        </p>
        <nav className="nav intro" style={{ "--i": 4 }} aria-label="Sections">
          <ul>
            {SECTIONS.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className={active === id ? "active" : ""}>
                  <span className="nav-line" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <ul className="socials intro" style={{ "--i": 5 }}>
        {socials.map(([icon, label, href]) => (
          <li key={icon}>
            <a
              href={href}
              aria-label={label}
              title={label}
              {...(icon !== "mail" ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              <Icon name={icon} />
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}
