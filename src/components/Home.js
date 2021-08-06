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
      { id: 1, username: "test-user-0" },
      { id: 2, username: "test-user-1" },
      { id: 3, username: "test-user-2" },
      { id: 4, username: "test-user-3" },
      { id: 5, username: "test-user-4" },
      { id: 6, username: "test-user-5" },
      { id: 7, username: "test-user-6" },
      { id: 8, username: "test-user-7" },
      { id: 9, username: "test-user-8" },
      { id: 10, username: "test-user-9" },
      { id: 11, username: "test-user-10" },
    ];
    setPeople(fakeData);
  }, []);
  const getChatHistory = (person) => {
    // console.log("Displaying chat history of", person);
    setChatHistory(person);
  };
  return (
    <div className="home">
      <div className="home__left">
        <div className="home__left__userbio">
          <Avatar
            className="home__left__avatar"
            src={`https://avatars.dicebear.com/api/initials/${username}.svg?background=%230000ff`}
          />
          <p className="home__left__avatar__username">{username}</p>
        </div>
        <div className="home__left__chats">
          {people.map((person) => (
            <Contact
              key={person.id}
              username={person.username}
              onClick={() => getChatHistory(person)}
            />
          ))}
        </div>
      </div>
      <div className="home__right">
        {chatHistory && <Chat person={chatHistory} currentUID={userId} />}
      </div>
    </div>
  );
}
export default Home;
