import React from "react";
import ProjectHeader from "./project/ProjectHeader";
import ProjectBody from "./project/ProjectBody";
import { withRouter } from "react-router-dom";
import { API_WS_ROOT } from "../../constants/index";
import { ActionCableProvider } from "react-actioncable-provider";

const Project = ({ match }) => {
  const { params } = match;

  return (
    <div className="project">
      <ProjectHeader projectCode={params.projectCode} />
      <ActionCableProvider url={API_WS_ROOT}>
        <ProjectBody projectCode={params.projectCode} />
      </ActionCableProvider>
    </div>
  );
};

export default withRouter(Project);
