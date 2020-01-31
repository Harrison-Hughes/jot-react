import React, { useState, useEffect } from "react";
import UpdateLog from "./project body/UpdateLog";
import DocumentContainer from "./project body/DocumentContainer";

const ProjectBody = props => {
  console.log(props);

  return (
    <div className="project-body">
      <UpdateLog />
      <DocumentContainer pads={props.project ? props.project.pads : []} />
    </div>
  );
};

export default ProjectBody;
