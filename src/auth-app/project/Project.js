import React, { useState, useEffect } from "react";
import ProjectHeader from "./project/ProjectHeader";
import ProjectBody from "./project/ProjectBody";
import { withRouter } from "react-router-dom";
import CollaboratorList from "./project/collaborators/CollaboratorList";
import API from "../../adapters/API";
import NewDocumentForm from "./project/NewDocumentForm";
import "./Project.css";
import EditProjectForm from "./project/EditProjectForm";
import { useAlert } from "react-alert";

const Project = ({ match, user, cableConnection }) => {
  const { params } = match;
  const alert = useAlert();

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
    // console.log(userCode, project.project_code);
    !!project &&
      API.sendInvitation(userCode, project.project_code)
        .then(resp => resp.json())
        .then(resp => {
          if (!!resp.error) popUpErrorMessage(resp.error);
          else {
            popUpSuccessMessage("invite sent");
          }
        });
    // .then(console.log)
    // .catch(console.log);
  };

  let messageStyles = { color: "white", fontWeight: "bold" };

  const popUpErrorMessage = message => {
    alert.error(<div style={messageStyles}>{message}</div>);
  };

  const popUpSuccessMessage = message => {
    alert.success(<div style={messageStyles}>{message}</div>);
  };

  if (!!errorPage)
    return (
      <>
        <div></div>
        <h1 className="error-header">server error: please refresh the page</h1>
      </>
    );
  else
    return (
      <div className="project-page">
        <ProjectHeader
          showCollaborators={showCollaborators}
          project={project}
          nickname={collaboration.nickname}
          access={collaboration.access}
          projectCode={params.projectCode}
          showEditProject={showEditProject}
          engageShowCollaborators={() => {
            setShowCollaborators(true);
            setShowNewDocumentForm(false);
            setShowEditProject(false);
          }}
          engageShowEditProject={() => {
            setShowCollaborators(false);
            setShowNewDocumentForm(false);
            setShowEditProject(true);
          }}
        />
        <ProjectBody
          cableConnection={cableConnection}
          passProjectUp={project => setProject(project)}
          access={collaboration.access}
          project={project}
          nickname={collaboration.nickname}
          showNewDocumentForm={showNewDocumentForm}
          someFormPresent={
            showCollaborators || showNewDocumentForm || showEditProject
              ? true
              : false
          }
          refetch={() => fetchProject()}
          engageShowNewDocumentForm={() => {
            setShowCollaborators(false);
            setShowNewDocumentForm(true);
            setShowEditProject(false);
          }}
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
          quitForm={() => {
            setShowCollaborators(false);
            setShowNewDocumentForm(false);
            setShowEditProject(false);
          }}
        />
        <EditProjectForm
          user={user}
          project={project}
          access={collaboration.access}
          showEditForm={showEditProject}
          refetch={() => fetchProject()}
          moreThanOneAdmin={() => moreThanOneAdmin()}
          quitForm={() => {
            setShowCollaborators(false);
            setShowNewDocumentForm(false);
            setShowEditProject(false);
          }}
        />
        {!!project && (
          <NewDocumentForm
            projectId={project.id}
            refetch={() => fetchProject()}
            showNewDocumentForm={showNewDocumentForm}
            toggleNewDoc={() => setShowNewDocumentForm(!showNewDocumentForm)}
            quitForm={() => {
              setShowCollaborators(false);
              setShowNewDocumentForm(false);
              setShowEditProject(false);
            }}
          />
        )}
      </div>
    );
};

export default withRouter(Project);
