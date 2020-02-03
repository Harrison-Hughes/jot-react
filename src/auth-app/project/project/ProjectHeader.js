import React, { useState, useEffect } from "react";
import Button from "../../../elements/Button";
import { Link } from "react-router-dom";

const ProjectHeader = props => {
  return (
    <div className="project-header">
      <p>project code: {props.projectCode}</p>
      <p>your nickname: {}</p>
      {props.project && <h1>{props.project.name}</h1>}
      <div></div>
      <Link to={`/homescreen`}>
        <Button>back to projects</Button>
      </Link>
    </div>
  );
};

export default ProjectHeader;
