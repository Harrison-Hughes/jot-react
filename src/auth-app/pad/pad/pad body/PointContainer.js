import React, { useEffect } from "react";
import NewPointButton from "./NewPointButton";

const ProjectContainer = props => {
  const renderPoints = () => {
    if (!!props.points) {
      return props.points.map((point, i) => {
        return <li key={i}>{point.text}</li>;
      });
    }
  };

  return (
    <div className="project-container">
      <ul className="points-list">{renderPoints()}</ul>
      <NewPointButton toggleNewPoint={props.toggleNewPoint} />
    </div>
  );
};

export default ProjectContainer;
