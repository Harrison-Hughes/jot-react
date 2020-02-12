import React from "react";
import "./ProjectCard.css";

const NewProjectCard = props => {
  return (
    <div
      onClick={() => props.engageNewProject()}
      className="project-card-static cente"
    >
      <div className="project-card-inner">
        <div
          className={
            props.deactivated
              ? "project-card-front"
              : "project-card-front new-project"
          }
        >
          <div className="project-card-front-centre">
            <h1 className="super-big">+</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProjectCard;
