import React, { useState, useEffect } from "react";

const ProjectHeader = props => {
  return (
    <div className="project-header">
      <h5>project code: {props.projectCode}</h5>
      {props.project && <h1>{props.project.name}</h1>}
    </div>
  );
};

export default ProjectHeader;
