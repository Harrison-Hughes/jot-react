import React, { useState, useEffect } from 'react';
import HomeHeader from './home/HomeHeader';
import HomeBody from './home/HomeBody';
import Button from '../elements/Button'
import Home from './home/Home';
import { Switch, Route } from 'react-router-dom'

const AuthenticatedApp = props => {

  return(
    <div>
      <Switch>
        <Route exact path="/Homescreen">
          <Home logOut={() => props.logOut()} user={props.user}/>
        </Route>
      </Switch>
    </div>
  )
}

export default AuthenticatedApp