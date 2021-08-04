import React, { useState, useEffect } from "react";
import Contact from "./Contact";
import Chat from "./Chat";
import { Avatar } from "@material-ui/core";
import { db } from "../services/firebase";
import "./Home.css";

const getUserDetails = () => {
  // Get data from session variable
  // console.log("Fetching from session");
  return [
    sessionStorage.getItem("email"),
    sessionStorage.getItem("username"),
    sessionStorage.getItem("userId"),
  ];
};
function Home() {
  const [email, username, userId] = getUserDetails();
  // console.log("userId from top", userId);
  const [people, setPeople] = useState([]);
  const [chatHistory, setChatHistory] = useState(null);
  useEffect(() => {
    const fakeData = [
      { id: 1, username: "test-user-0", useravatar: "A" },
      { id: 2, username: "test-user-1", useravatar: "B" },
      { id: 3, username: "test-user-2", useravatar: "C" },
      { id: 4, username: "test-user-3", useravatar: "D" },
      { id: 5, username: "test-user-4", useravatar: "E" },
      { id: 6, username: "test-user-5", useravatar: "F" },
      { id: 7, username: "test-user-6", useravatar: "G" },
      { id: 8, username: "test-user-7", useravatar: "H" },
      { id: 9, username: "test-user-8", useravatar: "I" },
      { id: 10, username: "test-user-9", useravatar: "J" },
      { id: 11, username: "test-user-10", useravatar: "K" },
    ];
    setPeople(fakeData);
    // Get chat list from firebase
    async function getChatList() {
      // const userRef = db.collection("users");
      // const queryRef = userRef.where("state", "==", "CA");
      const usersRef = db.collection("users");

      await usersRef.doc(userId).set({
        personId: "6182712827",
      });
    }
    // getChatList();
  }, []);
  const handleClick = (person) => {
    // console.log("Displaying chat history of", person);
    setChatHistory(person);
  };
  return (
    <div className="home">
      <div className="home__left">
        <div className="home__left__userbio">
          <Avatar
            className="home__left__avatar"
            alt={username}
            src="/static/images/avatar/1.jpg"
          />
          <p className="home__left__avatar__username">{username}</p>
        </div>
        <div className="home__left__chats">
          {people.map((person) => (
            <Contact
              key={person.id}
              username={person.username}
              useravatar={person.useravatar}
              onClick={() => handleClick(person)}
            />
          ))}
        </div>
      </div>
      <div className="home__right">
        {chatHistory && <Chat username={chatHistory.username} />}
      </div>
    </div>
  );
}
export default Home;
