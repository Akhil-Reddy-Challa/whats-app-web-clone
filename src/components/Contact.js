import React from "react";
import "./Contact.css";
import { Avatar } from "@material-ui/core";

function Contact(props) {
  // console.log(props);
  const { username, onClick, avatar, lastSeen, recentMessage } = props;
  return (
    <div className="contact" onClick={onClick} tabIndex="1">
      <Avatar className="contact__avatar" src={avatar} />
      <div className="contact__info">
        <div className="topLayer">
          <div className="name">{username}</div>
          <div className="lastSeen">{lastSeen}</div>
        </div>
        <div className="recentMessage">
          <p>{recentMessage}</p>
        </div>
      </div>
    </div>
  );
}
export default Contact;
