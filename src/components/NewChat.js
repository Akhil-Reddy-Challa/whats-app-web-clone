import React, { useState } from "react";
import { IconButton, TextField, Button } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import "../styles/NewChat.css";

function NewChat({ onClick, onClose }) {
  const [personEmail, setPersonEmail] = useState("");
  return (
    <div className="new__chat">
      <div className="new__chat__header">
        <div className="new__chat__prevBtn">
          <IconButton onClick={onClose} aria-label="prevButton">
            <ArrowBack style={{ color: "white" }} />
          </IconButton>
        </div>
        <div className="new__chat__text">New chat</div>
      </div>
      <form className="new__chat__form">
        <div className="new__chat__form__input">
          <TextField
            required
            label="Email"
            variant="filled"
            onChange={(e) => setPersonEmail(e.target.value)}
            fullWidth
          />
        </div>
        <div className="new__chat__form__submitBtn">
          <Button
            type="submit"
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              onClick(personEmail);
            }}
          >
            Find
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NewChat;
