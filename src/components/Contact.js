import React, { useState } from "react";
import Section from "./Section";
import db from "../firebase";
import { profile } from "../data/content";

const EMPTY = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState({ state: "idle", text: "" });

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const fail = (error) =>
    setStatus({ state: "error", text: `Sorry, that didn't send (${error.message}). Please email me instead.` });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ state: "sending", text: "" });
    try {
      db.firestore()
        .collection("Contact")
        .add(form)
        .then(() => {
          setStatus({ state: "ok", text: "Thanks! I'll get back to you soon." });
          setForm(EMPTY);
        })
        .catch(fail);
    } catch (error) {
      fail(error);
    }
  };

  return (
    <Section id="contact" label="⌘ contact" title="Let's build something">
      <div className="contact">
        <div>
          <p className="lead">
            I'm open to full-stack and front-end roles, freelance work and collaborations. Email is the
            quickest way to reach me.
          </p>
          <a className="cap cap-lg" href={`mailto:${profile.email}`}>{profile.email}</a>
          <div className="socials">
            <a className="cap cap-sm" href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a className="cap cap-sm" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a className="cap cap-sm" href={profile.resume} download>Resume ↓</a>
          </div>
        </div>
        <form className="panel form" onSubmit={handleSubmit}>
          <label>
            <span>Name</span>
            <input name="name" value={form.name} onChange={update} required autoComplete="name" />
          </label>
          <label>
            <span>Email</span>
            <input type="email" name="email" value={form.email} onChange={update} required autoComplete="email" />
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" rows="4" value={form.message} onChange={update} required />
          </label>
          <button className="cap cap-orange" type="submit" disabled={status.state === "sending"}>
            {status.state === "sending" ? "Sending…" : "Send message ↵"}
          </button>
          {status.text && <p className={`form-status ${status.state}`} role="status">{status.text}</p>}
        </form>
      </div>
    </Section>
  );
}
