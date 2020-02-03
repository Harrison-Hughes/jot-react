import React, { useState, useEffect } from "react";
import "./styles.css";
import API from "./adapters/API";
import { Switch, Route, Redirect } from "react-router-dom";

import AuthenticatedApp from "./auth-app/authenticated-app";
import SignUpForm from "./unauth-app/unauth-forms/SignUpForm";
import SignInForm from "./unauth-app/unauth-forms/SignInForm";

const App = () => {
  const [user, setUser] = useState(null);

  const logOut = () => {
    setUser(null);
    API.clearToken();
  };

  useEffect(() => {
    if (API.hasToken) {
      API.validate().then(setUser);
    }
  }, []);

  return (
    <Switch>
      <Route exact path="/WelcomeToJot">
        {!user ? (
          <SignUpForm signIn={user => setUser(user)} />
        ) : (
          <Redirect to="/homescreen" />
        )}
      </Route>
      <Route exact path="/WelcomeBack">
        {!user ? (
          <SignInForm signIn={user => setUser(user)} />
        ) : (
          <Redirect to="/homescreen" />
        )}
      </Route>
      {user ? (
        <AuthenticatedApp user={user} logOut={() => logOut()} />
      ) : (
        <Redirect to="/WelcomeToJot" />
      )}
    </Switch>
  );
};

export default App;
