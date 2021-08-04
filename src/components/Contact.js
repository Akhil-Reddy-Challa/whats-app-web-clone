import React from "react";
import "./Contact.css";
import { Avatar } from "@material-ui/core";

function Contact(props) {
  const getRandomSeed = () => {
    const max = 100;
    return Math.floor(Math.random() * max);
  };
  // console.log(props);
  const { username, onClick } = props;
  const randomSeed = getRandomSeed();
  return (
    <div className="contact" onClick={onClick}>
      <Avatar
        className="contact__avatar"
        src={`https://avatars.dicebear.com/api/bottts/${randomSeed}.svg`}
      />
      <h5>{username}</h5>
    </div>
  );
}
export default Contact;
