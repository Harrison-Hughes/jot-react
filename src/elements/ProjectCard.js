import React from "react";
import { Link } from "react-router-dom";

import "./ProjectCard.css";

const ProjectCard = props => {
  return (
    <div className="project-card">
      <div className="project-card-inner">
        <div className="project-card-front">
          <h3>{props.title}</h3>
          <p>{props.desc}</p>
        </div>
        <div className="project-card-back">
          <h3>{props.title}</h3>
          <ul>
            <li>code: {props.code}</li>
            <li>access: {props.access}</li>
            <li>status: {props.status}</li>
            <li>last edited: {props.lastEdited}</li>
          </ul>
          <Link to={`/project/${props.code}`}>
            <button>open</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

// create with <ProjectCard title={...} code={...} status={...} desc={...} access={...} lastEdited={...}/>
