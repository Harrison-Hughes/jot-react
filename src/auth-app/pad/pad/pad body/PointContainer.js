import React, { useState, useEffect } from "react";
// import NewPointButton from "./NewPointButton";

const ProjectContainer = props => {
  const renderPoints = () => {
    if (!!props.pad.points) {
      return props.pad.points.map((point, i) => {
        return (
          <BulletPoint
            isSelectedPoint={
              !!props.selectedPoint && props.selectedPoint.id === point.id
                ? true
                : false
            }
            onClick={() => props.setSelectedPoint(point)}
            id={point.id}
            key={i}
          >
            {point.text}
          </BulletPoint>
        );
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

const BulletPoint = ({ children, isSelectedPoint, ...props }) => {
  const classNameSelector = () => {
    if (isSelectedPoint) {
      return "selected-point bullet-point";
    } else return "bullet-point";
  };

  return (
    <li className={classNameSelector()} {...props}>
      {children}
    </li>
  );
};

export default ProjectContainer;
