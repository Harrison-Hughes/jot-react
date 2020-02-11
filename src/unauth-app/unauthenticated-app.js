import React from "react";
import { Switch, Route } from "react-router-dom";

import "./UnauthApp.css";
import SignInForm from "./unauth-forms/SignInForm";
import SignUpForm from "./unauth-forms/SignUpForm";

const UnauthenticatedApp = props => {
  return (
    <div className="unauthenticated-app">
      <Switch>
        <Route exact path="/WelcomeToJot">
          <SignUpForm signIn={user => props.signIn(user)} />
        </Route>
        <Route exact path="/WelcomeBack">
          <SignInForm signIn={user => props.signIn(user)} />
        </Route>
      </Switch>
    </div>
  );
};

export default UnauthenticatedApp;
