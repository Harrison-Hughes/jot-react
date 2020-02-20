import React, { useState, useEffect } from "react";
import "./styles.css";
import API from "./adapters/API";
import { Switch, Route, Redirect } from "react-router-dom";

import AuthenticatedApp from "./auth-app/authenticated-app";
import SignUpForm from "./unauth-app/unauth-forms/SignUpForm";
import SignInForm from "./unauth-app/unauth-forms/SignInForm";
import LoadingScreen from "./elements/LoadingScreen";

const App = () => {
  const [user, setUser] = useState(null);
  const [validatedUser, setValidatedUser] = useState(false);
  const [error, setError] = useState(null);

  const logOut = () => {
    setUser(null);
    API.clearToken();
  };

  useEffect(() => console.log(error), [error]);

  useEffect(() => {
    if (API.hasToken) {
      API.validate()
        .then(setUser)
        .then(() => setValidatedUser(true))
        .catch(data => {
          setError(data);
        });
    } else {
      setValidatedUser(true);
    }
  }, []);

  if (!validatedUser) return <LoadingScreen />;
  else
    return (
      <Switch>
        <Route exact path="/welcometojot">
          {!user ? (
            <SignUpForm signIn={user => setUser(user)} />
          ) : (
            <Redirect to="/homescreen" />
          )}
        </Route>
        <Route exact path="/welcomeback">
          {!user ? (
            <SignInForm signIn={user => setUser(user)} />
          ) : (
            <Redirect to="/homescreen" />
          )}
        </Route>
        {user ? (
          <AuthenticatedApp user={user} logOut={() => logOut()} />
        ) : (
          <Redirect to="/welcomeback" />
        )}
      </Switch>
    );
};

export default App;
