import React, { useState, useEffect } from "react";
import ProjectHeader from "./project/ProjectHeader";
import ProjectBody from "./project/ProjectBody";
import { withRouter } from "react-router-dom";
import { API_WS_ROOT } from "../../constants/index";
import { ActionCableProvider } from "react-actioncable-provider";
import CollaboratorList from "./project/collaborators/CollaboratorList";
import UpdateLog from "./project/project body/UpdateLog";
import API from "../../adapters/API";
import NewDocumentForm from "./project/NewDocumentForm";
import "./Project.css";
import EditProjectForm from "./project/EditProjectForm";

const Project = ({ match, user }) => {
  const { params } = match;

  const [project, setProject] = useState(null);

  const [showCollaborators, setShowCollaborators] = useState(false);
  const [showNewDocumentForm, setShowNewDocumentForm] = useState(false);
  const [showEditProject, setShowEditProject] = useState(false);

  const [collaborators, setCollaborators] = useState([]);
  const [collaboration, setCollaboration] = useState({
    created_at: "",
    nickname: "",
    access: ""
  });
  // const [userCode, setUserCode] = useState(`000000`);

  useEffect(() => fetchCollaborators(), []);
  useEffect(() => fetchProject(), []);
  useEffect(() => fetchCollaboration(), [project]);

  const fetchCollaborators = () => {
    if (API.hasToken) {
      API.getCollaborators(params.projectCode).then(setCollaborators);
    }
  };

  const fetchCollaboration = () => {
    if (!!project) {
      API.getCollaboration(project.id, user.id).then(resp =>
        setCollaboration({
          created_at: resp[0].created_at,
          nickname: resp[0].nickname,
          access: resp[0].access
        })
      );
    }
  };

  const fetchProject = () => {
    if (API.hasToken) {
      API.getProject(params.projectCode).then(proj => {
        setProject(proj);
      });
    }
  };

  const inviteUser = userCode => {
    !!project && API.sendInvitation(userCode, project.project_code);
  };

  return (
    <div className="project-page">
      <ProjectHeader
        toggleShowCollaborators={() => {
          if (!showCollaborators) {
            setShowNewDocumentForm(false);
            setShowEditProject(false);
          }
          setShowCollaborators(!showCollaborators);
        }}
        showCollaborators={showCollaborators}
        project={project}
        nickname={collaboration.nickname}
        access={collaboration.access}
        projectCode={params.projectCode}
        showEditProject={showEditProject}
        toggleShowEditProject={() => {
          if (!showEditProject) {
            setShowNewDocumentForm(false);
            setShowCollaborators(false);
          }
          setShowEditProject(!showEditProject);
        }}
      />
      <ActionCableProvider url={API_WS_ROOT}>
        <ProjectBody
          passProjectUp={project => setProject(project)}
          project={project}
          toggleNewDoc={() => {
            if (!showNewDocumentForm) {
              setShowCollaborators(false);
              setShowEditProject(false);
            }
            setShowNewDocumentForm(!showNewDocumentForm);
          }}
          showNewDocumentForm={showNewDocumentForm}
          someFormPresent={
            showCollaborators || showNewDocumentForm || showEditProject
              ? true
              : false
          }
        />
      </ActionCableProvider>
      <CollaboratorList
        access={collaboration.access}
        collaborators={collaborators}
        showCollaborators={showCollaborators}
        toggleShowCollaborators={() => setShowCollaborators(!showCollaborators)}
        projectCode={params.projectCode}
      />
      <EditProjectForm showEditForm={showEditProject} />
      <UpdateLog />
      {!!project && (
        <NewDocumentForm
          projectId={project.id}
          refetch={() => fetchProject()}
          showNewDocumentForm={showNewDocumentForm}
          toggleNewDoc={() => setShowNewDocumentForm(!showNewDocumentForm)}
        />
      )}
    </div>
  );
};

export default withRouter(Project);
