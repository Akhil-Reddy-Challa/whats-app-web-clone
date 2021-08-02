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
  const checkForAuthToken = (Component) => {
    const user_auth_token = sessionStorage.getItem("user_auth_token");
    return user_auth_token ? (
      <Component user_name={user_auth_token} />
    ) : (
      <Redirect to="/login" />
    );
  };
  return (
    <Router>
      <Switch>
        <Route path="/home" component={Home}></Route>
        <Route path="/" render={Landing}></Route>
      </Switch>
    </Router>
  );
};

export default App;
