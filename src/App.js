import React, { useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import { profile } from "./data/content";

export default function App() {
  const glow = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        glow.current.style.setProperty("--x", `${e.clientX}px`);
        glow.current.style.setProperty("--y", `${e.clientY}px`);
        glow.current.classList.add("on");
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={glow} className="glow" aria-hidden="true" />
      <a className="skip" href="#content">Skip to content</a>
      <div className="layout">
        <Sidebar />
        <main id="content">
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
          <footer className="footer">
            © {new Date().getFullYear()} {profile.name}. Built with React.
          </footer>
        </main>
      </div>
    </>
  );
}
