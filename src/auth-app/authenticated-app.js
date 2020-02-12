import React, { useEffect, useState } from "react";
import Home from "./home/Home";
import { Switch, Route } from "react-router-dom";
import Project from "./project/Project";
import Pad from "./pad/Pad";
import "./AuthApp.css";
import { API_WS_ROOT } from "../constants/index";
import ActionCable from "actioncable";

const AuthenticatedApp = props => {
  // console.log("AuthenticatedApp");
  const [cable, setCable] = useState(null);

  useEffect(() => {
    const createdCable = ActionCable.createConsumer(API_WS_ROOT);
    setCable(createdCable);
    return () => {
      createdCable.disconnect();
    };
  }, []);

  return (
    <div className="authenticated-app">
      <Switch>
        <Route exact path="/homescreen">
          <Home
            logOut={() => props.logOut()}
            cableConnection={cable}
            user={props.user}
          />
        </Route>
        <Route exact path="/project/:projectCode">
          <Project user={props.user} cableConnection={cable} />
        </Route>
        <Route exact path="/pad/:padCode">
          <Pad user={props.user} cableConnection={cable} />
        </Route>
      </Switch>
    </div>
  );
};

export default AuthenticatedApp;
