import React, {useState} from "react";
import "./ContactMe.css";
import emailjs from "emailjs-com";
import db from '../../firebase'
  // const sendEmail = (e) => {
  //   e.preventDefault();

  //   emailjs
  //     .sendForm(
  //       "service_qven3i8",
  //       "template_5ohjeme",
  //       e.target,
  //       "zV5sc2Lpu-PfPyPkq"
  //     )
  //     .then(
  //       (result) => {
  //         console.log(result.text);
  //       },
  //       (error) => {
  //         console.log(error.text);
  //       }
  //     );
  //   e.target.reset();
  //  };
const ContactMe = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage ] = useState("");
    const [loader , setLoader] = useState("");
    
    const handleSubmit = (e) => {
      e.preventDefault();
      setLoader(true);

      const database = db.firestore();
      database.collection("Contact")
      .add({
          name: name,
          email: email,
          message: message
      })
      .then(() => {
        setLoader(false);
          alert("Your message has been submitted👍");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

      setName("");
      setEmail("");
      setMessage("");
    }
  
  return (
    <div
      className="main-container fade-in"
      id="ContactMe"
      style={{ opacity: 5, transform: "translateY(1px)" }}
    >
      <div className="heading-container">
        <div className="screen-heading">
          <span>Contact Me</span>
        </div>
        <div className="screen-sub-heading">
          <span>Lets Keep In Touch</span>
        </div>
        <div className="heading-seperator">
          <div className="seperator-line"></div>
          <div className="seperator-blob">
            <div></div>
          </div>
        </div>
      </div>
      <div className="central-form">
        <div className="col">
          <h2 className="title">
            <p className="styles_typicalWrapper__1_Uvh">Get In Touch 📧</p>
          </h2>
          <a href='https://www.linkedin.com/in/shahzad-saleem-41b943208/'>
          <i className='fa fa-linkedin-square'></i>
      </a>
      <a href='https://github.com/MirzaShahzadSaleem'>
          <i className='fa fa-github-square'></i>
      </a>
        </div>
        <div className="back-form">
          <div className="img-back">
            <h4>Send Your Email Here!</h4>
  
          </div>
          <form onSubmit={handleSubmit}>
            <p></p>
            <label>Name</label>
            <input type="text" value={name} name="name"
            onChange={(e) => setName(e.target.value)} />

            <label>Email</label>
            <input type="email" value={email} name="email" 
            onChange={(e) => setEmail(e.target.value)}/>

            <label>Message</label>
            <textarea type="text" value={message} name="message"
            onChange={(e) => setMessage(e.target.value)}></textarea>
            <div className="send-btn">
              <button type="submit">
                send<i className="fa fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ContactMe;