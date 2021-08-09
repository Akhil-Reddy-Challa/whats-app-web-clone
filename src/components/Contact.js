import React from "react";
import "./Contact.css";
import { Avatar } from "@material-ui/core";
function getMiniTime(time) {
  if (time) {
    const minifiedTime = time.toDate().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const minifiedDate = time.toDate().toLocaleDateString();
    const final = minifiedTime.concat(" ").concat(minifiedDate);
    return final;
  }
  return time;
}
function Contact(props) {
  const { username, onClick, avatar, lastSeen } = props;

  return (
    <div className="contact" onClick={onClick} tabIndex="1">
      <Avatar className="contact__avatar" src={avatar} />
      <p className="contact__name">{username}</p>
      <p className="contact__lastSeen">{getMiniTime(lastSeen)}</p>
    </div>
  );
}
export default Contact;
