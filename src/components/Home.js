import React, { useState, useEffect } from "react";
import Contact from "./Contact";
import Chat from "./Chat";
function Home(props) {
  // const { user: userEmail } = props.location;
  // console.log(userEmail);
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
      { id: 6, username: "test-user-5", useravatar: "F" },
      { id: 7, username: "test-user-6", useravatar: "G" },
      { id: 8, username: "test-user-7", useravatar: "H" },
      { id: 9, username: "test-user-8", useravatar: "I" },
      { id: 10, username: "test-user-9", useravatar: "J" },
      { id: 11, username: "test-user-10", useravatar: "K" },
    ];
    setPeople(fakeData);
  }, []);
  const handleClick = (person) => {
    console.log("Displaying chat history of", person);
    setChatHistory(person);
  };
  return (
    <div className="container-fluid app">
      <div className="row">
        <div className="col-3">
          {people.map((person) => (
            <Contact
              username={person.username}
              useravatar={person.useravatar}
              onClick={() => handleClick(person)}
            />
          ))}
        </div>
        <div className="col">
          {chatHistory && (
            <Chat
              username={chatHistory.username}
              useravatar={chatHistory.useravatar}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default Home;
