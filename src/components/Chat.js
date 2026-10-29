import React, { useCallback, useEffect, useRef, useState } from "react";
import Message from "./Message";
import { answer, greeting } from "../chat/answers";

let nextId = 1;
const botMsg = (r) => ({ id: nextId++, from: "bot", ...r });

export default function Chat({ askRef, onBusy }) {
  const [messages, setMessages] = useState(() => [botMsg(greeting())]);
  const [typing, setTyping] = useState(false);
  const [busy, setBusy] = useState(true);
  const [value, setValue] = useState("");
  const feed = useRef(null);
  const nearBottom = useRef(true);

  const toBottom = useCallback((force) => {
    const el = feed.current;
    if (el && (force || nearBottom.current)) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => toBottom(true), [messages.length, typing, toBottom]);
  useEffect(() => onBusy(busy), [busy, onBusy]);

  const onScroll = () => {
    const el = feed.current;
    nearBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 140;
  };

  const ask = useCallback((text) => {
    const q = text.trim();
    if (!q || busy) return;
    setBusy(true);
    const mine = { id: nextId++, from: "me", text: q };
    const reply = botMsg(answer(q));
    setMessages((m) => [...m, mine]);
    setTyping(true);
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 650;
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, reply]);
    }, delay);
  }, [busy]);

  useEffect(() => {
    askRef.current = ask;
  }, [ask, askRef]);

  const onDone = useCallback(() => setBusy(false), []);
  const onProgress = useCallback(() => toBottom(false), [toBottom]);

  const last = [...messages].reverse().find((m) => m.from === "bot");
  const follow = last ? last.follow : [];

  return (
    <section className="chat" aria-label="Chat with Shahzad's portfolio assistant">
      <div className="feed" ref={feed} onScroll={onScroll} role="log" aria-live="polite">
        {messages.map((m) => (
          <Message key={m.id} msg={m} onDone={onDone} onAsk={ask} onProgress={onProgress} />
        ))}
        {typing && (
          <div className="msg bot typing" aria-label="Typing">
            <i /><i /><i />
          </div>
        )}
      </div>
      <div className="suggest">
        {follow.map((q) => (
          <button key={q} onClick={() => ask(q)} disabled={busy}>{q}</button>
        ))}
      </div>
      <form
        className="composer"
        onSubmit={(e) => {
          e.preventDefault();
          ask(value);
          setValue("");
        }}
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask anything… e.g. “does he know Python?” or “what is a Buy Box?”"
          aria-label="Ask a question"
          autoComplete="off"
        />
        <button type="submit" disabled={busy || !value.trim()} aria-label="Send">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
      </form>
    </section>
  );
}
