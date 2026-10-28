import React, { useState } from "react";
import Section from "./Section";
import Icon from "./Icons";
import db from "../firebase";
import { profile } from "../data/content";

const EMPTY = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState({ state: "idle", text: "" });

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const fail = (error) =>
    setStatus({ state: "error", text: `Sorry, the message couldn't be sent (${error.message}). Please email me directly.` });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ state: "sending", text: "" });
    try {
      db.firestore()
        .collection("Contact")
        .add(form)
        .then(() => {
          setStatus({ state: "ok", text: "Thanks for reaching out. I'll get back to you soon." });
          setForm(EMPTY);
        })
        .catch(fail);
    } catch (error) {
      fail(error);
    }
  };

  return (
    <Section id="contact" title="Contact">
      <p className="lead">
        I'm open to full-stack and front-end roles, freelance work and interesting collaborations.
        The fastest way to reach me is email, or you can use the form below.
      </p>
      <a className="btn" href={`mailto:${profile.email}`}>
        <Icon name="mail" size={18} /> {profile.email}
      </a>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            <span>Name</span>
            <input name="name" value={form.name} onChange={update} required autoComplete="name" />
          </label>
          <label>
            <span>Email</span>
            <input type="email" name="email" value={form.email} onChange={update} required autoComplete="email" />
          </label>
        </div>
        <label>
          <span>Message</span>
          <textarea name="message" rows="5" value={form.message} onChange={update} required />
        </label>
        <button className="btn btn-outline" type="submit" disabled={status.state === "sending"}>
          {status.state === "sending" ? "Sending…" : "Send message"}
        </button>
        {status.text && (
          <p className={`form-status ${status.state}`} role="status">{status.text}</p>
        )}
      </form>
    </Section>
  );
}
