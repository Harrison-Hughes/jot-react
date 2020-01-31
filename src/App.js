import React, { useState, useEffect } from 'react';
import './styles.css';
import API from "./adapters/API";
import AuthenticatedApp from './auth-app/authenticated-app';
import UnauthenticatedApp from './unauth-app/unauthenticated-app';
import { Switch, Route, Redirect } from 'react-router-dom'


const App = () => {
  const [user, setUser] = useState(null);

  const logOut = () => {
    setUser(null);
    API.clearToken();
  };

  useEffect(() => {
    if (API.hasToken()) {
      API.validate()
        .then(setUser)
    }}, []);

  return (
    <Switch>
      <Route exact path="/" render={() => (<Redirect to="/WelcomeBack"/>)}/>
      {!!user 
      ? <AuthenticatedApp 
          user={user} 
          logOut={() => logOut()} 
        /> 
      : <UnauthenticatedApp 
          signIn={user => setUser(user)}
        />}
    </Switch>
    )
}

export default App
