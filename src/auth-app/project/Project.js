import React, { useState } from "react";
import ProjectHeader from "./project/ProjectHeader";
import ProjectSubheader from "./project/ProjectSubheader";
import ProjectBody from "./project/ProjectBody";
import { withRouter } from "react-router-dom";
import { API_WS_ROOT } from "../../constants/index";
import { ActionCableProvider } from "react-actioncable-provider";
import CollaboratorList from "./project/project body/CollaboratorList";
import UpdateLog from "./project/project body/UpdateLog";

import "./Project.css";

const Project = ({ match }) => {
  const [project, setProject] = useState(null);
  const [collaboratorList, setCollaboratorList] = useState(false);
  const { params } = match;

  return (
    <div className="project-page">
      <ProjectHeader project={project} projectCode={params.projectCode} />
      <ProjectSubheader />
      <ActionCableProvider url={API_WS_ROOT}>
        <ProjectBody
          passProjectUp={project => setProject(project)}
          projectCode={params.projectCode}
        />
      </ActionCableProvider>
      <CollaboratorList
        collaboratorList={collaboratorList}
        toggleCollaboratorList={() => setCollaboratorList(!collaboratorList)}
        projectCode={params.projectCode}
      />
      <UpdateLog />
    </div>
  );
};

export default withRouter(Project);
