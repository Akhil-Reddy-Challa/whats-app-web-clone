import React from "react";
import "./Contact.css";
import { Avatar } from "@material-ui/core";

function Contact(props) {
  const { username, onClick, avatar } = props;
  return (
    <div className="contact" onClick={onClick} tabIndex="1">
      <Avatar className="contact__avatar" src={avatar} />
      <h5>{username}</h5>
    </div>
  );
}
export default Contact;
