import React, { useState, useEffect } from "react";
import ProjectHeader from "./project/ProjectHeader";
import ProjectBody from "./project/ProjectBody";
import { withRouter } from "react-router-dom";
import CollaboratorList from "./project/collaborators/CollaboratorList";
import API from "../../adapters/API";
import NewDocumentForm from "./project/NewDocumentForm";
import "./Project.css";
import EditProjectForm from "./project/EditProjectForm";

const Project = ({ match, user, cableConnection }) => {
  const { params } = match;

  const [project, setProject] = useState(null);
  const [errorPage, setErrorPage] = useState(false);

  const [showCollaborators, setShowCollaborators] = useState(false);
  const [showNewDocumentForm, setShowNewDocumentForm] = useState(false);
  const [showEditProject, setShowEditProject] = useState(false);

  const [collaborators, setCollaborators] = useState([]);
  const [collaboration, setCollaboration] = useState({
    created_at: "",
    nickname: "",
    access: ""
  });

  useEffect(() => fetchCollaborators(), [project]);
  useEffect(() => fetchProject(), []);
  useEffect(() => fetchCollaboration(), [project]);

  const fetchCollaborators = () => {
    if (!!project) {
      API.getCollaborators(params.projectCode).then(setCollaborators);
    }
  };

  const moreThanOneAdmin = () => {
    if (collaborators.length > 0) {
      if (collaborators.filter(c => c.access === "admin").length > 1)
        return true;
      else return false;
    } else return false;
  };

  const fetchCollaboration = () => {
    if (!!project) {
      API.getCollaboration(project.project_code, user.user_code).then(resp => {
        !!resp[0]
          ? setCollaboration({
              created_at: resp[0].created_at,
              nickname: resp[0].nickname,
              access: resp[0].access
            })
          : setErrorPage(true);
      });
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
    console.log(userCode, project.project_code);
    !!project && API.sendInvitation(userCode, project.project_code);
  };

  if (!!errorPage)
    return <div>please refresh the page - sorry for the inconvenience</div>;
  else
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
        <ProjectBody
          cableConnection={cableConnection}
          passProjectUp={project => setProject(project)}
          access={collaboration.access}
          project={project}
          nickname={collaboration.nickname}
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
        <CollaboratorList
          user={user}
          access={collaboration.access}
          collaborators={collaborators}
          showCollaborators={showCollaborators}
          toggleShowCollaborators={() =>
            setShowCollaborators(!showCollaborators)
          }
          projectCode={params.projectCode}
          project={project}
          inviteUser={userCode => inviteUser(userCode)}
        />
        <EditProjectForm
          user={user}
          project={project}
          access={collaboration.access}
          showEditForm={showEditProject}
          moreThanOneAdmin={() => moreThanOneAdmin()}
        />
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
