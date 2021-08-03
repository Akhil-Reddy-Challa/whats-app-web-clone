import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

import Landing from "./components/Landing";
import Home from "./components/Home";

const App = () => {
  const checkForAuthToken = () => {
    const tokenExists = sessionStorage.getItem("user_token_created_on");
    return tokenExists ? <Home /> : <Redirect to="/login" />;
  };
  return (
    <Router>
      <Switch>
        <Route path="/home" component={() => checkForAuthToken()}></Route>
        <Route path="/" render={Landing}></Route>
      </Switch>
    </Router>
  );
};
export default App;
