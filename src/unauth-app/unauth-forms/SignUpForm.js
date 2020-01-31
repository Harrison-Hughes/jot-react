import React, { useState } from 'react';
import API from "../../adapters/API";
import { Link, Redirect } from 'react-router-dom'


const SignUpForm = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");


  const handleSubmit = event => {
    event.preventDefault();
    let password_confirmation = passwordConfirmation;
    API.signup({ email, password , password_confirmation})
      .then(user => props.signIn(user))
      .then(<Redirect to="/Homescreen" />)
  };
    
  return(
    <div>
    <h1>sign up form</h1>
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
        <div>
          <label htmlFor="password">password confirmation: </label>
          <input
            type="password"
            name="password_confirmation"
            value={passwordConfirmation}
            onChange={event => setPasswordConfirmation(event.target.value)}
          />
        </div>
        <input type="submit" value="Sign up" />
      </form>
      <span>Already have an account? Please <Link to="/WelcomeBack">log in </Link> instead.</span>
    </div>
  )
}

export default SignUpForm