import React from 'react';
import Typical from 'react-typical';
import "./Profile.css";
import { Link } from "react-scroll";

export default function Profile() {
  return (
    <div className='profile-container'>
        <div className='profile-parent'>
            <div className='profile-details'>
                <div className='colz'>
                    <div className='colz-icon'>
                    <a href='https://www.linkedin.com/in/shahzad-saleem-41b943208/'>
                        <i className='fa fa-linkedin-square'></i>
                    </a>
                    <a href='https://github.com/MirzaShahzadSaleem'>
                        <i className='fa fa-github-square'></i>
                    </a>
                    </div>  
                </div>
                <div className='profile-details-name'>
                    <span className='primary-text'>
                    {" "}
                    Hello, I'M <span className='highlighted-text'>Shahzad</span>
                    </span>
                </div>
                <div className='profile-details-role'>
                   <span className='primary-text'>
                    {" "}
                    <h1>
                        {" "}
                        <Typical
                        loop={Infinity}
                        steps={[
                            "Ethusiastic Dev  ⭕️",
                            1000,
                            "MERN Stack Dev 🌐",
                            1000,
                            "React JS Dev 💻",
                            1000,
                        ]}
                        />
                    </h1>
                    <span className='profile-role-tagline'>
                    Knack of building applications with front and back end 
                    operations.
                    </span>
                   </span>
                </div>
                <div className='profile-options'>
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
                    <button className='btn highlighted-btn'>Get Resume</button>
                </a>
                </div>
            </div>
            <div className='profile-picture'>
                <div className='profile-picture-background'>
                
                </div>
            </div>
        </div>
    </div>
  )
}
