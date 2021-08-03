import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Signup.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 500,
    },
  },
}));
export default function Signup() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignup = () => {
    console.log("Checking", email, password);
  };

  return (
    <form className={classes.root}>
      <div>
        <TextField
          label="Username"
          variant="filled"
          color="primary"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <TextField
          label="Email"
          variant="filled"
          color="primary"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <TextField
          label="Password"
          variant="filled"
          color="primary"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        variant="contained"
        className="signup__submit__button"
        color="primary"
        disabled={!email || !password || !username}
        onClick={handleSignup}
      >
        Sign Up
      </Button>
    </form>
  );
}
