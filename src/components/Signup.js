import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { auth, db } from "../services/firebase";
import { useHistory } from "react-router-dom";

export default function Signup() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (event) => {
    event.preventDefault();
    // console.log("Checking", email, password);
    // console.log("Sign up module");
    // console.log(username, email, password);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: username,
        });
        // 1) Store data in session
        setAuthToken(authUser);
        // 2) Push data to usersInfo Collection
        const UID = authUser.user.uid;
        db.collection("usersInfo").doc(email).set({
          UID,
          name: username,
        });
        // 3) Push UID to chatInfo Collection
        db.collection("usersChatInfo").doc(UID).set({ isOnline: true });
        history.push("/home");
      })
      .catch((err) => alert(err.message));
  };
  const setAuthToken = (dataToken) => {
    // console.log("creating token: ", data);
    const userId = dataToken.user.uid;
    sessionStorage.setItem("user_token_created_on", new Date());
    sessionStorage.setItem("userId", userId);
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
