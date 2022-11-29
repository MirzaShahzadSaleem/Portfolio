import React from "react";
import { Link } from "react-scroll";

import "./AboutMe.css";

export default function AboutMe() {
  return (
    <div
      className="about-me-container screen-container fade-in"
      id="AboutMe"
      style={{ opacity: 5, transform: "translateY(1px)" }}
    >
      <div className="about-me-parent">
        <div className="heading-container">
          <div className="screen-heading">
            <span>About Me</span>
          </div>
          <div className="screen-sub-heading">
            <span>Why Choose Me?</span>
          </div>
          <div className="heading-seperator">
            <div className="seperator-line"></div>
            <div className="seperator-blob">
              <div></div>
            </div>
          </div>
        </div>
        <div className="about-me-card">
          <div className="about-me-profile"></div>
          <div className="about-me-details">
            <span className="about-me-description">
            Learning MERN stack development with strong React commands with redux,
            code optimization, and effective application-building skills. I’m doing 
            a BS in CS. Looking forward to becoming a valuable asset to an organization.
            </span>
            <div className="about-me-highlights">
              <div className="highlight-heading">
                <span>Here are a Few Highlights:</span>
              </div>
              <div className="highlight">
                <div className="highlight-blob"></div>
                <span>React JS Developer at Geeks Of Kolachi</span>
              </div>
              <div className="highlight">
                <div className="highlight-blob"></div>
                <span>Student At DHA Suffa University</span>
              </div>
              <div className="highlight">
                <div className="highlight-blob"></div>
                <span>Learning MERN Stack</span>
              </div>
              <div className="highlight">
                <div className="highlight-blob"></div>
                <span>React and ES6/7 JavaScript</span>
              </div>
              <div className="highlight">
                <div className="highlight-blob"></div>
                <span>Redux for State Mnanagement</span>
              </div>
              <div className="highlight">
                <div className="highlight-blob"></div>
                <span>Building REST API</span>
              </div>
            </div>
            <div className="about-me-options">
              <button className="btn primary-btn">
                {" "}
                <Link
                  to="ContactMe"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  {""}
                  Hire Me{" "}
                  
                </Link>{" "}
              </button>
              <a href='ShahzadCV.pdf' download=" ShahzadCV.pdf">
                <button className="btn highlighted-btn">Get Resume</button>
              </a>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
