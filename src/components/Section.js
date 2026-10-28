import React, { useEffect, useRef, useState } from "react";

export default function Section({ id, label, title, children }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id={id} ref={ref} className={`section${shown ? " in" : ""}`}>
      <div className="section-head">
        <span className="label">{label}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}
