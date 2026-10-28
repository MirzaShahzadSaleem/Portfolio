import React, { useCallback, useEffect, useRef, useState } from "react";
import { profile, experience } from "../data/content";

const NAME = "SHAHZAD";

const ROWS = [
  [...NAME].map((c, i) => ({ id: `l${i}`, label: c, letter: c, k: c.toLowerCase() })),
  [
    { id: "react", label: "REACT", sub: "frontend", w: 2, tone: "blue", info: "React · SPAs, Redux and Context API, used daily for 5+ years" },
    { id: "next", label: "NEXT.JS", sub: "framework", w: 2, tone: "blue", info: "Next.js · server rendering, routing and fast, SEO-friendly UIs" },
    { id: "node", label: "NODE", sub: "backend", w: 2, tone: "blue", info: "Node.js · REST APIs with Express and Nest.js, auth and RBAC" },
    { id: "ts", label: "TS", info: "TypeScript · typed, maintainable codebases" },
  ],
  [
    { id: "projects", label: "PROJECTS", sub: "jump", w: 2, go: "projects" },
    { id: "work", label: "WORK", sub: "jump", w: 2, go: "experience" },
    { id: "hire", label: "HIRE ↵", sub: "enter", w: 2, tone: "orange", k: "Enter", go: "contact", focus: true },
    { id: "cv", label: "CV", sub: "pdf", resume: true },
  ],
  [
    { id: "space", label: `${profile.years} YEARS`, sub: "space", w: "full", k: " ", info: `${profile.years} years of full-stack work · now ${experience[0].role} at ${experience[0].company}` },
  ],
];

const GREETING = "hello, world. I'm Shahzad 👋";

function confetti() {
  const colors = ["#ff7a45", "#3b6cff", "#22c55e", "#facc15", "#a855f7"];
  for (let i = 0; i < 70; i++) {
    const c = document.createElement("i");
    c.className = "confetti";
    c.style.left = `${Math.random() * 100}vw`;
    c.style.background = colors[i % colors.length];
    c.style.animationDelay = `${Math.random() * 0.4}s`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 2400);
  }
}

export default function Keyboard() {
  const [screen, setScreen] = useState("");
  const [down, setDown] = useState({});
  const typed = useRef("");
  const board = useRef(null);
  const timers = useRef([]);

  useEffect(() => {
    const list = timers.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setScreen(GREETING);
      return undefined;
    }
    const chars = Array.from(GREETING);
    chars.forEach((_, i) => list.push(setTimeout(() => setScreen(chars.slice(0, i + 1).join("")), 400 + i * 45)));
    return () => list.forEach(clearTimeout);
  }, []);

  const press = useCallback((key) => {
    const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
    setDown((d) => ({ ...d, [key.id]: true }));
    later(() => setDown((d) => ({ ...d, [key.id]: false })), 150);

    if (key.letter) {
      typed.current = (typed.current + key.letter).slice(-NAME.length);
      if (typed.current === NAME) {
        typed.current = "";
        setScreen("SHAHZAD ✓ you typed my name. Nice!");
        confetti();
      } else {
        setScreen(typed.current);
      }
      return;
    }
    typed.current = "";
    if (key.info) setScreen(key.info);
    if (key.resume) {
      setScreen("downloading resume…");
      const a = document.createElement("a");
      a.href = profile.resume;
      a.download = "";
      a.click();
    }
    if (key.go) {
      setScreen(key.focus ? "great choice. opening contact…" : `jumping to ${key.go}…`);
      later(() => {
        document.getElementById(key.go)?.scrollIntoView({ behavior: "smooth" });
        if (key.focus) later(() => document.querySelector("#contact input")?.focus({ preventScroll: true }), 700);
      }, 350);
    }
  }, []);

  useEffect(() => {
    const keys = ROWS.flat().filter((k) => k.k);
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.target.closest?.("input, textarea, select, [contenteditable]")) return;
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const matches = keys.filter((x) => x.k === k);
      if (!matches.length) return;
      e.preventDefault();
      press(matches[0]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [press]);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        board.current.style.setProperty("--rx", `${30 - y * 12}deg`);
        board.current.style.setProperty("--rz", `${-4 + x * 6}deg`);
        board.current.style.setProperty("--ry", `${x * 10}deg`);
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="kb">
      <div className="screen" role="status" aria-live="polite">
        <span className="prompt">&gt;</span> {screen}
        <span className="caret" aria-hidden="true" />
      </div>
      <div className="scene">
        <div className="board" ref={board}>
          {ROWS.map((row, r) => (
            <div className="kb-row" key={r}>
              {row.map((key) => (
                <button
                  key={key.id}
                  type="button"
                  className={`key ${key.tone || ""} ${key.w === 2 ? "w2" : ""} ${key.w === "full" ? "wfull" : ""} ${down[key.id] ? "down" : ""}`}
                  onClick={() => press(key)}
                  aria-label={key.info || key.label}
                >
                  {key.label}
                  {key.sub && <small>{key.sub}</small>}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="kb-hint">
        Click the keys, or use your keyboard: <kbd>S</kbd> <kbd>H</kbd> <kbd>A</kbd> … <kbd>Space</kbd> <kbd>Enter</kbd>
      </p>
    </div>
  );
}
