import React from "react";
import { Link } from "react-scroll";

import "./Navbar.css";

export default function Navbar() {
  const [show, setShow] = React.useState(false);
  return (
    <div className="header-container">
      <div className="header-parent">
        <div className="header-hamburger">
          <img
            src="./image/menu.png"
            alt="menu"
            onClick={() => setShow(!show)}
          />
        </div>
        <div className="header-logo">
          <span>PORTFOLIO</span>
        </div>
        <div
          className={
            show === true
              ? "header-options show-hamburger-options"
              : "header-options"
          }
        >
          <h1 className="close" onClick={() => setShow(!show)}>
            X
          </h1>
          <div className="header-option header-option-seperator selected-header-option ">
            <Link
              activeClass="selected-header-option"
              to="Profile"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Home
            </Link>
          </div>
          <div className="header-option header-option-seperator ">
            <Link
              activeClass="selected-header-option"
              to="AboutMe"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              AboutMe
            </Link>
          </div>
          <div className="header-option header-option-seperator ">
            <Link
              activeClass="selected-header-option"
              to="Resume"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Resume
            </Link>
          </div>
          <div className="header-option header-option-seperator ">
            <Link
              activeClass="selected-header-option"
              to="ContactMe"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              ContactMe
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
