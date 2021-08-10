import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import { DonutLarge, MoreVert, Add } from "@material-ui/icons";
import Contact from "./Contact";
import "./Sidebar.css";

function SideBar(props) {
  // console.log(props);
  const {
    userAvatar,
    currentUsername,
    friendsList,
    createNewChat,
    showChathistory,
  } = props;
  return (
    <div className="sidebar">
      <div className="sidebar__userbio">
        <Avatar className="sidebar__avatar" src={userAvatar} />
        <p className="sidebar__avatar__username">{currentUsername}</p>
        <div className="sidebar__userbio__shortCuts">
          <div className="storyIcon">
            <Tooltip title="Displays Status">
              <IconButton aria-label="storyIcon">
                <DonutLarge color="action" />
              </IconButton>
            </Tooltip>
          </div>
          <div className="newChatIcon">
            <Tooltip title="Add New Chat">
              <IconButton aria-label="newChatIcon" onClick={createNewChat}>
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
      <div className="sidebar__chats">
        {friendsList.map((friend) => (
          <Contact
            key={friend.email}
            username={friend.name}
            avatar={friend.avatar}
            lastSeen={friend.lastSeen}
            recentMessage={friend.recentMessage}
            onClick={() => showChathistory(friend)}
          />
        ))}
      </div>
    </div>
  );
}

export default SideBar;
