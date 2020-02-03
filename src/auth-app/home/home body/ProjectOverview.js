import React from "react";
import { Link } from "react-router-dom";

const ProjectOverview = props => {
  return (
    <div className="project overview">
      <Link to={`/project/${props.project.project_code}`}>
        <h3>{props.project.name}</h3>
      </Link>
      <ul>
        <li>project code: {props.project.project_code}</li>
        <li>{props.project.description}</li>
        <li>status: {props.project.open ? "open" : "private"}</li>
      </ul>
    </div>
  );
};

export default ProjectOverview;
