import React from "react";
import "./Contact.css";
import { Avatar } from "@material-ui/core";

function Contact(props) {
  const { username, onClick, avatar, lastSeen } = props;
  return (
    <div className="contact" onClick={onClick} tabIndex="1">
      <Avatar className="contact__avatar" src={avatar} />
      <p className="contact__name">{username}</p>
      <p className="contact__lastSeen">{lastSeen}</p>
    </div>
  );
}
export default Contact;
