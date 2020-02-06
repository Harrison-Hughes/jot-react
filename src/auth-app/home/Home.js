import React from "react";
import HomeHeader from "./HomeHeader";
import HomeBody from "./HomeBody";

const Home = props => {
  return (
    <div className="home container">
      <HomeHeader logOut={() => props.logOut()} user={props.user} />
      <HomeBody user={props.user} />
    </div>
  );
};

export default Home;
