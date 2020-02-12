import React from "react";
import Home from "./home/Home";
import { Switch, Route } from "react-router-dom";
import Project from "./project/Project";
import Pad from "./pad/Pad";
import "./AuthApp.css";
import { API_WS_ROOT } from "../constants/index";
import { ActionCableProvider, ActionCable } from "react-actioncable-provider";

const AuthenticatedApp = props => {
  // console.log("AuthenticatedApp");
  return (
    <ActionCableProvider url={API_WS_ROOT}>
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
    </ActionCableProvider>
  );
};

export default AuthenticatedApp;
