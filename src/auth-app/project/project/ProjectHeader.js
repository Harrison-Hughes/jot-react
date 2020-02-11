import React from "react";
import Button from "../../../elements/Button";
import { Link } from "react-router-dom";

const ProjectHeader = props => {
  return (
    <div className="project-header">
      <div className="h1">
        <div className="h-project-code-grid">
          project code:
          <div className="bold centred large-font">{props.projectCode}</div>
        </div>
      </div>
      <div className="h2">
        <div className="h-project-code-grid">
          your nickname:
          <div className="bold centred large-font">{props.nickname}</div>
        </div>
      </div>
      <div className="h3">
        <div className="h-project-code-grid">
          access:
          <div className="bold centred large-font">{props.access}</div>
        </div>
      </div>
      <div className="h4">{props.project && <h1>{props.project.name}</h1>}</div>
      <div className="h5">
        <Button thin onClick={props.toggleShowCollaborators}>
          {props.showCollaborators ? "cancel" : "collaborators"}
        </Button>
      </div>
      <div className="h6">
        <Button thin onClick={props.toggleShowEditProject}>
          {props.showEditProject ? "cancel" : "options"}
        </Button>
      </div>
      <div className="h7">
        <Link to={`/homescreen`}>
          <Button thin>back to projects</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectHeader;
