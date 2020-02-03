import React, { useState } from "react";
import API from "../../adapters/API";
import { Link, Redirect } from "react-router-dom";

const SignUpForm = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    let password_confirmation = passwordConfirmation;
    API.signup({ email, password, password_confirmation })
      .then(user => props.signIn(user))
      .then(<Redirect to="/Homescreen" />);
  };

  return (
    <div className="main">
      <h1 className="head">sign up form</h1>
      <div className="body form-style-5">
        <form className="body" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="email">email: </label>
            <input
              type="text"
              name="email"
              placeholder="must be valid email address"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">password: </label>
            <input
              type="password"
              name="password"
              placeholder="must be at least 6 characters"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">password confirmation: </label>
            <input
              type="password"
              name="password_confirmation"
              placeholder="must match password"
              value={passwordConfirmation}
              onChange={event => setPasswordConfirmation(event.target.value)}
            />
          </div>
          <input
            disabled={!validateEmail(email) || password.length < 6}
            type="submit"
            value="Sign up"
          />
        </form>
      </div>

      <span className="foot">
        Already have an account? Please <Link to="/WelcomeBack">log in </Link>{" "}
        instead.
      </span>
    </div>
  );
};

const validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export default SignUpForm;
