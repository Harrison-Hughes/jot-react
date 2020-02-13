import React from "react";

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
            access={props.access}
          >
            {point.text}
          </BulletPoint>
        );
      });
    }
  };

  return (
    <div
      className={
        props.access === "read only"
          ? "pad-container-read-only"
          : "pad-container"
      }
    >
      <h2>{props.pad.name}</h2>
      <ul className="points-list">{renderPoints()}</ul>
    </div>
  );
};

const BulletPoint = ({ children, isSelectedPoint, ...props }) => {
  const classNameSelector = () => {
    if (props.access === "read only") return "bullet-point-untouchable";
    else if (isSelectedPoint) {
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
