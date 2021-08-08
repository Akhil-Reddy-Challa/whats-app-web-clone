import React, { useState, useEffect } from "react";
import "./Home.css";
import Contact from "./Contact";
import Chat from "./Chat";
import BasePage from "./BasePage";
import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import { DonutLarge, MoreVert, Add } from "@material-ui/icons";
import NewChat from "./NewChat";
import { auth, db } from "../services/firebase";

const getUserDetails = () => {
  // Get data from session variable
  // console.log("Fetching from session");
  return [sessionStorage.getItem("username"), sessionStorage.getItem("userId")];
};
function Home() {
  const [currentUsername, currentUserID] = getUserDetails();
  // console.log("userId from top", userId);
  const [friendsList, setFriendsList] = useState([]);
  const [chatHistory, setChatHistory] = useState(null);
  const [newChatRequested, setNewChat] = useState(false);
  useEffect(() => {
    // Fetch data from db
    // async function fetchContacts() {
    //   let chatsRef = db.collection("").doc(userID).collection("chats");
    //   let allChats = await chatsRef.get();
    //   // console.log("User:", userID);
    //   // console.log("Chats with the following people:");
    //   const personsList = [];
    //   allChats.forEach((doc) => {
    //     // console.log(doc, doc.data());
    //     personsList.push({
    //       personID: doc.id,
    //       personName: doc.data().personName,
    //     });
    //   });
    //   console.log(personsList);
    //   setPeople(personsList);
    // }
    // fetchContacts();
    setFriendsList([
      { UID: "dAmZ6pW8CXPy4Dff2zJDxUqMy973", name: "TestUser-2" },
      { UID: "nIV0431w2ZUcFLH8Qt12dfQz6eB2", name: "TestUser-3" },
    ]);
  }, []);
  const getChatHistory = (friend) => {
    // console.log("Fetching chat history of", friend);
    const data = { friendName: friend.name, friendUID: friend.UID };
    setChatHistory(data);
  };
  const handleNewChat = () => {
    console.log("New chat req rec");
    setNewChat(!newChatRequested);
  };
  const findAboutNewChat = async (email) => {
    try {
      const user = await db.collection("usersInfo").doc(email).get();
      if (user.exists) {
        const data = {
          UID: user.data().UID,
          name: user.data().name,
        };
        console.log(data);
      } else {
        alert("No such user exists!");
      }
    } catch (err) {
      alert("Encountered an issue! Try again");
    }

    // auth
    //   .fetchSignInMethodsForEmail(email)
    //   .then((msg) => {
    //     if (msg.length === 0) alert("No such account exist");
    //     console.log(msg);
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });
  };
  return (
    <div className="home">
      <div className="home__left">
        <div className="home__left__userbio">
          <Avatar
            className="home__left__avatar"
            src={`https://avatars.dicebear.com/api/initials/${currentUsername}.svg?background=%230000ff`}
          />
          <p className="home__left__avatar__username">{currentUsername}</p>
          <div className="home__left__userbio__shortCuts">
            <div className="storyIcon">
              <Tooltip title="Displays Status">
                <IconButton aria-label="storyIcon">
                  <DonutLarge color="action" />
                </IconButton>
              </Tooltip>
            </div>
            <div className="newChatIcon">
              <Tooltip title="Add New Chat">
                <IconButton aria-label="newChatIcon" onClick={handleNewChat}>
                  <Add color="action" className="newChatIcon" />
                </IconButton>
              </Tooltip>
            </div>
            <div className="userInfoIcon">
              <Tooltip title="Get Your Info">
                <IconButton aria-label="userInfoIcon">
                  <MoreVert color="action" className="userInfoIcon" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="home__left__chats">
          {friendsList.map((friend) => (
            <Contact
              key={friend.UID}
              username={friend.name}
              onClick={() => getChatHistory(friend)}
            />
          ))}
        </div>
      </div>
      {newChatRequested && (
        <NewChat onClick={(e) => findAboutNewChat(e)} onClose={handleNewChat} />
      )}
      <div className="home__right">
        {chatHistory ? (
          <Chat friendInfo={chatHistory} currentUserID={currentUserID} />
        ) : (
          <BasePage username={currentUsername} />
        )}
      </div>
    </div>
  );
}
export default Home;
