import React, { useEffect, useState } from "react";
import { profile } from "../data/content";

const LINKS = [
  ["projects", "Projects"],
  ["experience", "Experience"],
  ["skills", "Skills"],
  ["contact", "Contact"],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <a href="#top" className="brand">
        <span className="brand-key">S</span> shahzad.dev
      </a>
      <nav>
        {LINKS.map(([id, label]) => (
          <a key={id} href={`#${id}`}>{label}</a>
        ))}
      </nav>
      <a className="cap cap-sm" href={profile.resume} download>
        Resume ↓
      </a>
    </header>
  );
}
