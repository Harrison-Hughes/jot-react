import React, { useState, useEffect } from 'react';
import API from "../../adapters/API";
import { Link } from 'react-router-dom'

const SignInForm = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    API.signin({ email, password })
      .then(user => props.signIn(user))
  };
    
  return(
    <div>
      <h1>log in form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">email: </label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password: </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <input type="submit" value="Log in" />
      </form>
      <span>Don't have an account? Please <Link to="/WelcomeToJot">sign up </Link> instead.</span>
    </div>
  )
}

export default SignInForm