import React, { useState, useEffect } from "react";
import "./Home.css";
import NewChat from "./NewChat";
import { db } from "../services/firebase";
import SideBar from "./SideBar";
import ChatArea from "./ChatArea";

const getUserDetails = () => {
  // Get data from session variable
  return [sessionStorage.getItem("username"), sessionStorage.getItem("email")];
};
const getRelativeTime = (timestamp) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;

  let elapsed = Date.now() - timestamp.toMillis();

  if (elapsed < msPerMinute) return Math.round(elapsed / 1000) + " seconds ago";
  else if (elapsed < msPerHour)
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  else if (elapsed < msPerDay)
    return Math.round(elapsed / msPerHour) + " hours ago";
  else if (elapsed < msPerMonth) {
    const days = Math.round(elapsed / msPerDay);
    if (days == 1) return "1 day ago";
    else if (days < 7) return days + " days ago";
  }
  const date = new Date(timestamp.toMillis());
  const result = date.toLocaleDateString("en", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  return result;
};
function Home() {
  const [currentUsername, currentUserEmail] = getUserDetails();
  const [userAvatar, setUserAvatar] = useState("");
  const [friendsList, setFriendsList] = useState([]);
  const [chatHistory, setChatHistory] = useState(null);
  const [newChatRequested, setNewChat] = useState(false);

  useEffect(() => {
    const usersData = {};
    async function fetchChatProfiles() {
      const chatsRef = db.collection("chats");
      chatsRef
        .where("users", "array-contains", currentUserEmail)
        .onSnapshot((snap) => {
          const contacts = [];
          snap.forEach((conversation) => {
            const { users: usersInvolved, recentMessage } = conversation.data();
            const otherPerson =
              usersInvolved[0] === currentUserEmail
                ? usersInvolved[1]
                : usersInvolved[0];
            const contact = {};
            contact["name"] = usersData[otherPerson].name;
            contact["chatRoomID"] = conversation.id;
            contact["email"] = otherPerson;
            contact["avatar"] = usersData[otherPerson].avatar;
            contact["lastSeen"] = getRelativeTime(
              usersData[otherPerson].lastSeen
            );
            contact["recentMessage"] = recentMessage;
            contacts.push(contact);
          });
          // Set user avatar
          setUserAvatar(usersData[currentUserEmail].avatar);
          // Render list of contacts on the sidebar
          // console.log(contacts);
          setFriendsList(contacts);
        });
    }
    async function fetchContacts() {
      const usersRef = db.collection("users");

      // Fetch all users
      usersRef.onSnapshot((snap) => {
        snap.forEach((user) => (usersData[user.id] = user.data()));
        // console.log(usersData);
        // Fetch all the chats
        fetchChatProfiles();
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
    } // Check if email exists in our chat already
    const isFriend = friendsList.filter((friend) => friend.email === email);
    if (isFriend.length === 1) {
      toggleNewChat();
      getChatHistory(isFriend[0]);
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
        recentMessage: "Recent most message would pop-up here!",
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
      <SideBar
        userAvatar={userAvatar}
        currentUsername={currentUsername}
        createNewChat={toggleNewChat}
        showChathistory={getChatHistory}
        friendsList={friendsList}
      />
      {newChatRequested && (
        <NewChat
          onClick={(e) => createNewChatRoom(e)}
          onClose={toggleNewChat}
        />
      )}
      <ChatArea
        currentUserEmail={currentUserEmail}
        currentUsername={currentUsername}
        chatHistory={chatHistory}
      />
    </div>
  );
}
export default Home;
