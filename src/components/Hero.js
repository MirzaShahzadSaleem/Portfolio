import React from "react";
import Keyboard from "./Keyboard";
import { profile } from "../data/content";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <p className="status"><i aria-hidden="true" /> Open to new opportunities</p>
      <h1>
        Hi, I'm <span>{profile.name}</span>.
        <br />
        {profile.role}, {profile.years} years.
      </h1>
      <p className="hero-sub">{profile.tagline} Press a key to find out more. Try typing my name.</p>
      <Keyboard />
    </section>
  );
}
