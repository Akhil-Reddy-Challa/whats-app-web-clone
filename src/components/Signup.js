import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { auth, db } from "../services/firebase";
import { useHistory } from "react-router-dom";
import firebase from "firebase";

export default function Signup() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: username,
        });
        // 1) Store data in session
        setAuthToken();
        // 2) Create an avatar & push data to users Collection
        db.collection("users").doc(email).set({
          name: username,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          avatar: getRandomAvatar(),
        });
        history.push("/home");
      })
      .catch((err) => alert(err.message));
  };
  const getRandomAvatar = () => {
    const colors = [
      "amber",
      "blue",
      "blueGrey",
      "brown",
      "cyan",
      "deepOrange",
      "deepPurple",
      "green",
      "grey",
      "indigo",
      "lightBlue",
      "lightGreen",
      "lime",
      "orange",
      "pink",
      "purple",
      "red",
      "teal",
      "yellow",
    ];
    const randColor = colors[Math.floor(Math.random() * (colors.length + 1))];
    const randColorLevel = Math.floor(1 + Math.random() * 10) * 100;
    const url = `https://avatars.dicebear.com/api/initials/${username}.svg?backgroundColors[]=${randColor}&bold=1&backgroundColorLevel=${randColorLevel}`;
    return url;
  };
  const setAuthToken = () => {
    sessionStorage.setItem("user_token_created_on", new Date());
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("email", email);
  };
  return (
    <form>
      <TextField
        label="Username"
        variant="filled"
        color="primary"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
      />
      <TextField
        label="Email"
        variant="filled"
        color="primary"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        label="Password"
        variant="filled"
        color="primary"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button
        onClick={(e) => handleSignup(e)}
        variant="outlined"
        type="submit"
        disabled={!email || !password || !username}
        style={{ marginTop: "10px", color: "#01bfa5" }}
        fullWidth
      >
        Sign Up
      </Button>
    </form>
  );
}
