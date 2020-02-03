import React, { useState, useEffect } from "react";
import HomeHeader from "./HomeHeader";
import HomeBody from "./HomeBody";

const Home = props => {
  return (
    <div className="home constainer">
      <HomeHeader logOut={() => props.logOut()} user={props.user} />
      <HomeBody user={props.user} />
    </div>
  );
};

export default Home;
