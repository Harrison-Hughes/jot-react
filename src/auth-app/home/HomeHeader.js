import React, { useState, useEffect } from 'react';
import Button from '../../elements/Button';

const HomeHeader = props => {

  return(
    <div className="home header">
      <h1>HOMESCREEN</h1>
      <h4>Your code: {props.user.user_code}</h4>
      <Button onClick={()=>props.logOut()}>log out</Button>
    </div>
  )
}

export default HomeHeader