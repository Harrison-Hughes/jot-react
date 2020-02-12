import React, { useState, useEffect } from "react";
import API from "../../adapters/API";
import { Link, Redirect } from "react-router-dom";

const SignUpForm = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = event => {
    event.preventDefault();
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
    let password_confirmation = passwordConfirmation;
    API.signup({ email, password, password_confirmation })
      .then(user => props.signIn(user))
      .then(<Redirect to="/Homescreen" />)
      .catch(errorPromise => {
        errorPromise.then(data => {
          setError(data.error);
        });
      });
  };

  useEffect(() => console.log(error), [error]);

  return (
    <div className="main">
      <h1 className="head">welcome to</h1>
      <h1 className="sub-head">J O T</h1>
      <p className="desc">the collaborative note taking tool</p>
      <div className="unauth-body form-style-5">
        <form className="form-body" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="email">email: </label>
            <label className="small-label">must be valid email address</label>
            <input
              type="text"
              name="email"
              className={emailValidateClass(email)}
              // placeholder="must be valid email address"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">password: </label>
            <label className="small-label">must be at least 6 characters</label>
            <input
              type="password"
              name="password"
              className={inputFieldClassForPassword(password)}
              // placeholder="must be at least 6 characters"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">password confirmation: </label>
            <label className="small-label">must match password </label>
            <input
              type="password"
              name="password_confirmation"
              className={inputFieldClassForPassword(passwordConfirmation)}
              // placeholder="must match password"
              value={passwordConfirmation}
              onChange={event => setPasswordConfirmation(event.target.value)}
            />
          </div>
          {!!error && <span>{error}</span>}
          <br />
          <input
            disabled={!validateEmail(email) || password.length < 6}
            type="submit"
            value="Sign up"
          />
        </form>
      </div>

      <span className="foot">
        Already have an account? Please <Link to="/welcomeback">log in </Link>{" "}
      </span>
    </div>
  );
};

const inputFieldClassForPassword = password => {
  if (password.length === 0) return "";
  else if (password.length < 6) return "invalid";
  else return "valid";
};

const emailValidateClass = email => {
  if (email.length === 0) return "";
  else if (validateEmail(email)) return "valid";
  else return "invalid";
};

const validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export default SignUpForm;
