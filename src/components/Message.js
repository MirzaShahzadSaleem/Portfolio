import React, { useEffect, useRef, useState } from "react";
import { Rich } from "./Blocks";

const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Message({ msg, onDone, onAsk, onProgress }) {
  const total = msg.text.length;
  const [shown, setShown] = useState(() => (msg.from === "me" || reduce() ? total : 0));
  const done = useRef(false);

  useEffect(() => {
    if (msg.from === "me") return undefined;
    if (shown >= total) {
      if (!done.current) {
        done.current = true;
        onDone(msg.id);
      }
      return undefined;
    }
    const t = setTimeout(() => {
      setShown((n) => Math.min(n + 3, total));
      onProgress();
    }, 14);
    return () => clearTimeout(t);
  }, [shown, total, msg.id, msg.from, onDone, onProgress]);

  if (msg.from === "me") return <div className="msg me">{msg.text}</div>;

  const complete = shown >= total;
  return (
    <div className="msg bot">
      <span className="bot-text">{Array.from(msg.text).slice(0, shown).join("")}</span>
      {complete && msg.kind && (
        <div className="rich">
          <Rich kind={msg.kind} data={msg.data} onAsk={onAsk} />
        </div>
      )}
    </div>
  );
}
