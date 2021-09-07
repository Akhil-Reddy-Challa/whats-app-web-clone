import Chat from "./Chat";
import BasePage from "./BasePage";
import "./styles/ChatArea.css";

function ChatArea(props) {
  const { chatHistory, currentUserEmail, currentUsername } = props;
  return (
    <div className="chatarea">
      {chatHistory ? (
        <Chat friendInfo={chatHistory} email={currentUserEmail} />
      ) : (
        <BasePage username={currentUsername} />
      )}
    </div>
  );
}

export default ChatArea;
