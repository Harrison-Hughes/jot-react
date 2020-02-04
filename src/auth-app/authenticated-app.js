import React from "react";
import Home from "./home/Home";
import { Switch, Route } from "react-router-dom";
import Project from "./project/Project";
import Pad from "./pad/Pad";
import "./AuthApp.css";

const AuthenticatedApp = props => {
  return (
    <div className="authenticated-app">
      <Switch>
        <Route exact path="/homescreen">
          <Home logOut={() => props.logOut()} user={props.user} />
        </Route>
        <Route exact path="/project/:projectCode">
          <Project user={props.user} />
        </Route>
        <Route exact path="/pad/:padCode">
          <Pad user={props.user} />
        </Route>
      </Switch>
    </div>
  );
};

export default AuthenticatedApp;
