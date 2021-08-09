import React from "react";
import "./Contact.css";
import { Avatar } from "@material-ui/core";
// const userInfo = await usersRef.doc(data.email).get();
// data["name"] = userInfo?.data().name;
// console.log(data);
function Contact(props) {
  const getRandomImg = (name) => {
    const colors = [
      "amber",
      "blue",
      "blueGrey",
      "brown",
      "cyan",
      "deepOrange",
      "deepPurple",
      "green",
      "grey",
      "indigo",
      "lightBlue",
      "lightGreen",
      "lime",
      "orange",
      "pink",
      "purple",
      "red",
      "teal",
      "yellow",
    ];
    const randColor = colors[Math.floor(Math.random() * (colors.length + 1))];
    const randColorLevel = Math.floor(1 + Math.random() * 10) * 100;
    const url = `https://avatars.dicebear.com/api/initials/${name}.svg?backgroundColors[]=${randColor}&bold=1&backgroundColorLevel=${randColorLevel}`;
    return url;
  };
  const { username, onClick } = props;
  const image = getRandomImg(username);
  return (
    <div className="contact" onClick={onClick} tabIndex="1">
      <Avatar className="contact__avatar" src={image} />
      <h5>{username}</h5>
    </div>
  );
}
export default Contact;
