import React, { useState, useEffect } from "react";

const ProjectHeader = props => {
  console.log(props);

  return <div className="project-header">{props.projectCode}</div>;
};

export default ProjectHeader;
