import React, { useState } from "react";
import API from "../../adapters/API";
import { Link, Redirect } from "react-router-dom";
import "./SignInForms.css";

const SignInForm = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = event => {
    event.preventDefault();
    setEmail("");
    setPassword("");
    API.signin({ email, password })
      .then(user => props.signIn(user))
      .then(<Redirect to="/Homescreen" />)
      .catch(errorPromise => {
        errorPromise.then(data => {
          setError(data.error);
        });
      });
  };

  // useEffect(() => console.log(error), [error]);

  return (
    <div className="main">
      <h1 className="head">welcome to</h1>
      <h1 className="sub-head">J O T</h1>
      <p className="desc">the collaborative note taking tool</p>
      <div className="unauth-body form-style-5">
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="email">email: </label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">password: </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </div>
          {!!error && <span>{error}</span>}
          <br />
          <input
            disabled={!validateEmail(email) || password.length < 1}
            type="submit"
            value="Log in"
          />
        </form>
      </div>
      <div className="foot">
        Don't have an account? Please <Link to="/welcometojot">sign up </Link>
        instead
      </div>
    </div>
  );
};

const validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export default SignInForm;
