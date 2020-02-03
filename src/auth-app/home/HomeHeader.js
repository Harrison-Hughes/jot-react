import React from "react";
import Button from "../../elements/Button";

const HomeHeader = props => {
  return (
    <div className="home-header header">
      <div className="h1">
        <h4>Your code: {props.user.user_code}</h4>
      </div>
      <div className="h3">
        <h1>JOT</h1>
      </div>
      <div className="h5">
        <Button onClick={() => props.logOut()}>log out</Button>
      </div>
    </div>
  );
};

export default HomeHeader;
