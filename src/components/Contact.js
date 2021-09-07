import React from "react";
import "./styles/Contact.css";
import { Avatar } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  badge: {
    backgroundColor: "rgb(6, 215, 85)",
    marginRight: "20px",
    fontWeight: "bold",
    color: "white",
  },
}));

function Contact({
  username,
  onClick,
  avatar,
  lastSeen,
  recentMessage,
  isRecentMessageSender,
  unReadMessagesCount,
}) {
  const unReadMessagesExist = isRecentMessageSender && unReadMessagesCount > 0;
  //console.log("isRecentMessageSender", isRecentMessageSender);
  const classes = useStyles();
  return (
    <div
      className={"contact ".concat(unReadMessagesExist ? "unReadMessages" : "")}
      onClick={onClick}
      tabIndex="1"
    >
      <Avatar className="contact__avatar" src={avatar} />
      <table className="contact__information">
        <tbody>
          <tr>
            <td colSpan="2" className="contact__name textWrap">
              {username}
            </td>
            <td className="contact__lastSeen">{lastSeen}</td>
          </tr>
          <tr className="secondRow">
            <td colSpan="2" className="recentMessage textWrap">
              {recentMessage}
            </td>
            {unReadMessagesExist && (
              <td className="unReadMessagesCount">
                <Badge
                  classes={{ badge: classes.badge }}
                  badgeContent={unReadMessagesCount}
                  max={99}
                ></Badge>
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default Contact;
