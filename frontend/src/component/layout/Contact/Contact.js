import React from "react";
import "./Contact.css";
import CallIcon from '@mui/icons-material/Call';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

function Contact() {
  return (
    <div >
      <h1>Contact Us</h1>
      <div className="contactContainer" >
        <div>
      <MailOutlineIcon fontSize="large"></MailOutlineIcon>
      <div className="mailTo">
      <a >fianzaorganics@gmail.com</a>
      </div>
      <div>
        <CallIcon fontSize="large"></CallIcon>
        <h3>+91-7889460904</h3>
      </div>
      </div>
      </div>
    </div>
  );
}

export default Contact
    