import React from "react";
import "./Contact.css";
import { Avatar } from "@material-ui/core";

function Contact(props) {
  // console.log(props);
  const { username, useravatar, onClick } = props;
  return (
    <div className="contact" onClick={onClick}>
      <Avatar
        className="contact__avatar"
        alt={useravatar}
        src="/static/images/avatar/1.jpg"
      />
      <h5>{username}</h5>
    </div>
  );
}
export default Contact;
