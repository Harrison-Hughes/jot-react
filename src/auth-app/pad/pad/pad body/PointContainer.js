import React, { useState, useEffect } from "react";
// import NewPointButton from "./NewPointButton";

const ProjectContainer = props => {
  const renderPoints = () => {
    if (!!props.pad.points) {
      // let pointsClone = Object.assign({}, props.pad.points);
      return props.pad.points.map((point, i) => {
        return <BulletPoint key={i}>{point.text}</BulletPoint>;
      });
    }
  };

  return (
    <div className="pad-container">
      <h2>{props.pad.name}</h2>
      <ul className="points-list">{renderPoints()}</ul>
    </div>
  );
};

const BulletPoint = ({ children, ...props }) => {
  return (
    <li className="bullet-point" {...props}>
      {children}
    </li>
  );
};

export default ProjectContainer;
