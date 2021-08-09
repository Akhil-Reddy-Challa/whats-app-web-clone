import React, { useState, useEffect } from "react";
import "./Home.css";
import Contact from "./Contact";
import Chat from "./Chat";
import BasePage from "./BasePage";
import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import { DonutLarge, MoreVert, Add } from "@material-ui/icons";
import NewChat from "./NewChat";
import { db } from "../services/firebase";

const getUserDetails = () => {
  // Get data from session variable
  // console.log("Fetching from session");
  return [sessionStorage.getItem("username"), sessionStorage.getItem("email")];
};
const getMiniTime = (time) => {
  // console.log(time);
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
};
function Home() {
  const [currentUsername, currentUserEmail] = getUserDetails();
  const [userAvatar, setUserAvatar] = useState("");
  const [friendsList, setFriendsList] = useState([]);
  const [chatHistory, setChatHistory] = useState(null);
  const [newChatRequested, setNewChat] = useState(false);
  useEffect(() => {
    async function fetchContacts() {
      const chatRef = db.collection("chats");
      const usersRef = db.collection("users");
      const usersData = {};
      const userInfo = await usersRef.get();
      userInfo.forEach((doc) => {
        usersData[doc.id] = doc.data();
      });
      // console.log(usersData);
      chatRef
        .where("users", "array-contains", currentUserEmail)
        .onSnapshot((snap) => {
          const contacts = [];
          snap.forEach((chat) => {
            const { users } = chat.data();
            const data = {};
            const friendEmail =
              users[0] === currentUserEmail ? users[1] : users[0];
            data["chatRoomID"] = chat.id;
            data["email"] = friendEmail;
            data["name"] = usersData[friendEmail].name;
            data["avatar"] = usersData[friendEmail].avatar;
            data["lastSeen"] = getMiniTime(usersData[friendEmail].lastSeen);
            contacts.push(data);
          });
          // Set user avatar
          setUserAvatar(usersData[currentUserEmail].avatar);
          // Render list of contacts on the sidebar
          setFriendsList(contacts);
        });
    }
    fetchContacts();
  }, [currentUserEmail]);
  const getChatHistory = (friend) => {
    // console.log("Fetching chat history of", friend);
    setChatHistory(friend);
  };
  const toggleNewChat = () => {
    setNewChat(!newChatRequested);
  };
  const createNewChatRoom = async (email) => {
    if (email === currentUserEmail) {
      alert("You entered your own email!");
      return;
    }
    try {
      const newPersonObj = await db.collection("users").doc(email).get();
      if (!newPersonObj.exists) {
        alert("No such user exists!");
        return;
      }
      const chatsRef = db.collection("chats");
      await chatsRef.add({
        users: [currentUserEmail, email],
      });
      // getChatHistory({ UID, name });
      toggleNewChat();
    } catch (err) {
      console.log(err);
      alert("Encountered an issue! Try again");
    }
  };
  return (
    <div className="home">
      <div className="home__left">
        <div className="home__left__userbio">
          <Avatar className="home__left__avatar" src={userAvatar} />
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
                <IconButton aria-label="newChatIcon" onClick={toggleNewChat}>
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
              key={friend.email}
              username={friend.name}
              avatar={friend.avatar}
              lastSeen={friend.lastSeen}
              onClick={() => getChatHistory(friend)}
            />
          ))}
        </div>
      </div>
      {newChatRequested && (
        <NewChat
          onClick={(e) => createNewChatRoom(e)}
          onClose={toggleNewChat}
        />
      )}
      <div className="home__right">
        {chatHistory ? (
          <Chat friendInfo={chatHistory} email={currentUserEmail} />
        ) : (
          <BasePage username={currentUsername} />
        )}
      </div>
    </div>
  );
}
export default Home;
