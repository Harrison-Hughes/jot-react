import React, { useState, useEffect } from 'react';
import Button from '../../elements/Button';

const HomeHeader = props => {

  console.log(props)
  return(
    <div>
      <h4>Your code: {props.user.user_code}</h4>
      <Button onClick={()=>props.logOut()}>log out</Button>
    </div>
  )
}

export default HomeHeader