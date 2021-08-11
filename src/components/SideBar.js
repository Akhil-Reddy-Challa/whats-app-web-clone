import React, { useState } from "react";
import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import { DonutLarge, MoreVert, Add } from "@material-ui/icons";
import Popover from "@material-ui/core/Popover";
import Contact from "./Contact";
import "./Sidebar.css";
import { useHistory } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const handleLogout = (history) => {
  console.log("Loggin out");
  sessionStorage.clear();
  history.push("/");
};
function SideBar(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
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
              <IconButton
                aria-label="userInfoIcon"
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <MoreVert color="action" className="userInfoIcon" />
              </IconButton>
            </Tooltip>
          </div>
          <Popover
            open={Boolean(anchorEl)}
            id={Boolean(anchorEl) ? "simple-popover" : undefined}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <List component="nav" aria-label="secondary mailbox folders">
              <ListItem button>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem
                button
                className="listExpander"
                onClick={() => handleLogout(history)}
              >
                <ListItemText primary="Log Out" />
              </ListItem>
            </List>
          </Popover>
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
