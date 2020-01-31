import React, { useState, useEffect } from 'react';

const AuthenticatedApp = props => {

  return(
    <div>
      logged in
      <button onClick={()=>props.logOut()}>log out</button>
    </div>
  )
}

export default AuthenticatedApp