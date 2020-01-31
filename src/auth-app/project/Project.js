import React, { useState, useEffect } from "react";
import API from "../../adapters/API";
import ProjectHeader from "./project/ProjectHeader";
import ProjectBody from "./project/ProjectBody";
import { withRouter } from "react-router-dom";

const Project = ({ match }) => {
  const [projectCode, setProjectCode] = useState(null);
  const [project, setProject] = useState(null);
  const { params } = match;

  useEffect(() => {
    setProjectCode(params.projectCode);
  }, []);

  const fetchProject = () => {};

  return (
    <div className="project">
      <ProjectHeader projectCode={projectCode} />
      <ProjectBody />
    </div>
  );
};

export default withRouter(Project);
