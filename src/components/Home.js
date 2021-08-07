import React, { useState, useEffect } from "react";
import Contact from "./Contact";
import Chat from "./Chat";
import { Avatar } from "@material-ui/core";
import "./Home.css";

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
  useEffect(() => {
    // Fetch data from db
    // async function fetchContacts() {
    //   let chatsRef = db.collection("users").doc(userID).collection("chats");
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
            <span className="storyIcon">
              <svg
                id="ee51d023-7db6-4950-baf7-c34874b80976"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="currentColor"
                  d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"
                ></path>
              </svg>
            </span>
            <span className="newMessageIcon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="currentColor"
                  d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"
                ></path>
              </svg>
            </span>
            <span className="getUserInfoIcon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="currentColor"
                  d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
                ></path>
              </svg>
            </span>
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
      <div className="home__right">
        {chatHistory && (
          <Chat friendInfo={chatHistory} currentUserID={currentUserID} />
        )}
      </div>
    </div>
  );
}
export default Home;
