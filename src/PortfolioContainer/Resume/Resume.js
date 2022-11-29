import React from "react";

// import { Link } from "react-scroll";
import "./Resume2.css";
import "./Resume.css";

export default function Resume() {
  const [count, setCount] = React.useState(0);
  return (
    <div
      className="resume-container screen-container fade-in"
      id="Resume"
      style={{ opacity: 5, transform: "translateY(1px)" }}
    >
      <div className="resume-content">
        <div className="heading-container">
          <div className="screen-heading">
            <span>Resume</span>
          </div>
          <div className="screen-sub-heading">
            <span>My formal Bio Details</span>
          </div>
          <div className="heading-seperator">
            <div className="seperator-line"></div>
            <div className="seperator-blob">
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <div className="resume-card">
        <div className="resume-bullets">
          <div className="bullet-container">
            <div className="bullet-icons"></div>
            <div className="bullets">
              <div
                className={count === 0 ? "bullet selected-bullet" : "bullet"}
                onClick={() => setCount(0)}
              >
                <img
                  className="bullet-logo"
                  src="	https://img.icons8.com/stickers/100/000000/education.png"
                  alt="B"
                />
                <span className="bullet-label">Education</span>
              </div>
              <div
                className={count === -360 ? "bullet selected-bullet" : "bullet"}
                onClick={() => setCount(-360)}
              >
                <img
                  className="bullet-logo"
                  src="https://img.icons8.com/fluency/48/000000/hard-working.png
                  "
                  alt="B"
                />
                <span className="bullet-label">Work History</span>
              </div>
              <div
                className={count === -710 ? "bullet selected-bullet" : "bullet"}
                onClick={() => setCount(-710)}
              >
                <img
                  className="bullet-logo"
                  src="https://img.icons8.com/color-glass/48/000000/google-code.png"
                  alt="B"
                />
                <span className="bullet-label">Programming Skills</span>
              </div>
              <div
                className={
                  count === -1070 ? "bullet selected-bullet" : "bullet"
                }
                onClick={() => setCount(-1070)}
              >
                <img
                  className="bullet-logo"
                  src="	https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-projects-home-based-business-flaticons-flat-flat-icons.png"
                  alt="B"
                />
                <span className="bullet-label">Projects</span>
              </div>
              <div
                className={
                  count === -1450 ? "bullet selected-bullet" : "bullet"
                }
                onClick={() => setCount(-1450)}
              >
                <img
                  className="bullet-logo"
                  src="https://img.icons8.com/external-dygo-kerismaker/48/000000/external-Interest-user-experience-dygo-kerismaker.png"
                  alt="B"
                />
                <span className="bullet-label">Interests</span>
              </div>
            </div>
          </div>
        </div>
        <div className="resume-bullet-details">
          <div
            className="resume-details-carousal"
            style={{ transform: `translateY(${count + "px"})` }}
          >
            <div className="resume-screen-container" id="A">
              <div className="resume-heading">
                <div className="resume-main-heading">
                  <div className="heading-bullet"></div>
                  <span>DHA SUFFA UNIVERSITY</span>
                  <div className="heading-date">2019-2023</div>
                </div>
                <div className="resume-sub-heading">
                  <span>◉ BACHELOR OF COMPUTER SCIENCE</span>
                </div>
              </div>

              <div className="resume-heading">
                <div className="resume-main-heading">
                  <div className="heading-bullet"></div>
                  <span>LAMBDA - The Consulting Group</span>
                  <div className="heading-date">Aug17-Oct17</div>
                </div>
                <div className="resume-sub-heading">
                  <span>◉ Certification in Office Automation</span>
                </div>
                <div className="resume-heading-description">
                  <span>◉ Certification in Abode Illustrator</span>
                </div>
              </div>
              <div className="resume-heading">
                <div className="resume-main-heading">
                  <div className="heading-bullet"></div>
                  <span>Govt. Degree Boys College, Gulistan e Jauhar </span>
                  <div className="heading-date">2017-2018</div>
                </div>
                <div className="resume-sub-heading">
                  <span>◉ Intermediate</span>
                </div>
                <div className="resume-heading-description">
                  <span></span>
                </div>
              </div>
            </div>
            <div className="resume-screen-container" id="B">
                <div className="resume-heading">
                  <div className="resume-main-heading">
                    <div className="heading-bullet"></div>
                    <span>GEEKS OF KOLACHI</span>
                    <div className="heading-date">AUG 2022-Present</div>
                  </div>
                  <div className="resume-sub-heading">
                    <span>◉ FRONTEND DEV.</span>
                  </div>
                  <br />
                  <div className="resume-main-heading">
                  <div className="heading-bullet"></div>
                  <span>TRUKKR.PK</span>
                  <div className="heading-date">MARCH 2022</div>
                </div>
                <div className="resume-sub-heading">
                  <span>◉ MERN STACK INTERN </span>
                </div>
                <br />
                <div className="resume-main-heading">
                <div className="heading-bullet"></div>
                <span>JEDDAH SOFT</span>
                <div className="heading-date">JUNE 2021</div>
              </div>
              <div className="resume-sub-heading">
                <span>◉ REACT JS INTERN </span>
              </div>
              <br />
              
              </div>
            </div>
            <div className=" programming-skills-container">
              <div className="skill-parent">
                <div className="heading-bullet"></div>
                <span> React JS</span>
                <div className="skill-percentage">
                  <div
                    className="active-percentage-bar"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
              <div className="skill-parent">
                <div className="heading-bullet"></div>
                <span>JavaScript</span>
                <div className="skill-percentage">
                  <div
                    className="active-percentage-bar"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
              <div className="skill-parent">
                <div className="heading-bullet"></div>
                <span>Redux</span>
                <div className="skill-percentage">
                  <div
                    className="active-percentage-bar"
                    style={{ width: "40%" }}
                  ></div>
                </div>
              </div>
             
              <div className="skill-parent">
                <div className="heading-bullet"></div>
                <span>TailwindCss</span>
                <div className="skill-percentage">
                  <div
                    className="active-percentage-bar"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>
              <div className="skill-parent">
                <div className="heading-bullet"></div>
                <span>BootStrap</span>
                <div className="skill-percentage">
                  <div
                    className="active-percentage-bar"
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </div>
              <div className="skill-parent">
                <div className="heading-bullet"></div>
                <span>Git</span>
                <div className="skill-percentage">
                  <div
                    className="active-percentage-bar"
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </div>
              <div className="skill-parent">
                <div className="heading-bullet"></div>
                <span>HTML</span>
                <div className="skill-percentage">
                  <div
                    className="active-percentage-bar"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
              <div className="skill-parent">
                <div className="heading-bullet"></div>
                <span>CSS</span>
                <div className="skill-percentage">
                  <div
                    className="active-percentage-bar"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="resume-screen-container">
              <div className="resume-heading">
                <div className="resume-main-heading">
                  <div className="heading-bullet"></div>
                  <span>BLOCK FREIGHT - FYP</span>
                  <div className="heading-date">MAY 2022 - PRESENT</div>
                </div>
                <div className="resume-sub-heading">
                  <span>Technologies Used: React JS, Node JS, MongoDB, Blockchain</span>
                </div>
                <div className="resume-heading-description">
                  <span>
                    This project will track & manage freight & transactions record. 
                  </span>
                </div>
              </div>
              <div className="resume-heading">
                <div className="resume-main-heading">
                  <div className="heading-bullet"></div>
                  <span>PATIENT TRACKER </span>
                  <div className="heading-date">OCT 2022- Present</div>
                </div>
                <div className="resume-sub-heading">
                  <span>Technologies Used: React JS, Firebase, Material UI</span>
                </div>
                <div className="resume-heading-description">
                  <span>
                    Doctor can enter current patient medical situation and also can view patient's past record.
                  </span>
                  
                </div>
              </div>



              <div className="resume-heading">
                <div className="resume-main-heading">
                  <div className="heading-bullet"></div>
                  <span>CAR PARKING RESERVATION SYSTEM </span>
                  <div className="heading-date">SEPT 2021- FEB 2022</div>
                </div>
                <div className="resume-sub-heading">
                  <span>Technologies Used: React JS, Firebase, Material UI</span>
                </div>
                <div className="resume-heading-description">
                  <span>
                    The UI of this project is a parking plaza where user can book their parking as per the slot time.
                  </span>
                  
                </div>
              </div>


              {/* <div className="resume-heading">
                <div className="resume-main-heading">
                  <div className="heading-bullet"></div>
                  <span>Ecommerce Website </span>
                  <div className="heading-date">2020-2021</div>
                </div>
                <div className="resume-sub-heading">
                  <span>
                    Technologies Used: Mongo DB, Epress Js, React Js, Node JS,
                    Redux, Bootstrap.
                  </span>
                </div>
                <div className="resume-heading-description">
                  <span>
                    Online ecommerce website for showcasing and selling products
                    onlne with payment system integration, both Paypal and
                    Stripe
                  </span>
                </div>
              </div> */}
            </div>
            <div className="resume-screen-container">
              {/* <div className="resume-heading">
                <div className="resume-main-heading">
                  <div className="heading-bullet"></div>
                  <span>Teaching</span>
                  <div></div>
                </div>
                <div className="resume-sub-heading">
                  <span></span>
                </div>
                <div className="resume-heading-description">
                  <span>
                    Apart from being a tech enthusiast and a code writer, i also
                    love to teach people what i know simply because i believe in
                    sharing.
                  </span>
                </div>
              </div> */}
              <div className="resume-heading">
                <div className="resume-main-heading">
                  <div className="heading-bullet"></div>
                  <span> Content Creator </span>
                  <div></div>
                </div>
                <div className="resume-sub-heading">
                  <span></span>
                </div>
                <div className="resume-heading-description">
                  <span>
                  Apart from work I love to film sacrifcial animals although its a seasional activity but good for a revitalizing break.
                  </span>
                </div>
              </div>
              <div className="resume-heading">
                <div className="resume-main-heading">
                  <div className="heading-bullet"></div>
                  <span>Competitive Gaming</span>
                  <div></div>
                </div>
                <div className="resume-sub-heading">
                  <span></span>
                </div>
                <div className="resume-heading-description">
                  <span>
                    I like to challenge my reflexes a lot while competing in
                    football games, pushing the rank and having interactive
                    gaming sessions excites me the most.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
