import React, { useState, useEffect } from "react";
import NewProjectButton from "./buttons/NewProjectButton";
import ProjectCard from "../../../elements/ProjectCard";
import "./ProjectContainer.css";
import JoinProjectButton from "./buttons/JoinProjectButton";
import ShowInvitationsButton from "./buttons/ShowInvitationsButton";

const ProjectContainer = props => {
  const renderProjectCards = () => {
    return (
      props.projects !== [] &&
      props.projects.map((project, i) => {
        // let access = userAccess(project.id, props.user.id);
        // console.log(access);
        return (
          <div key={i} className="project-container-project-card element">
            <ProjectCard
              projectID={project.id}
              userID={props.user.id}
              unflippable={props.newProjectForm || props.joinProjectForm}
              title={project.name}
              code={project.project_code}
              status={project.open ? "open" : "private"}
              desc={project.description}
              // access={"admin"}
              lastEdited={project.updated_at}
            />
          </div>
        );
      })
    );
  };

  useEffect(() => {
    props.refetch();
  }, []);

  return (
    <div className="project-container">
      <div className="project-container-header">
        <div className="project-container-header-left">
          <ShowInvitationsButton
            active={props.invitationsList}
            toggleInvitationsList={props.toggleInvitationsList}
          />
        </div>
        <div className="project-container-header-middle">
          <h2>YOUR PROJECTS</h2>
        </div>
        <div className="project-container-header-right">
          <NewProjectButton
            active={props.newProjectForm}
            toggleNewProject={props.toggleNewProject}
          />
          <JoinProjectButton
            active={props.joinProjectForm}
            toggleJoinProject={props.toggleJoinProject}
          />
        </div>
      </div>
      <div
        className={
          props.newProjectForm || props.joinProjectForm
            ? "project-container-body blur y-proximity"
            : "project-container-body y-proximity"
        }
      >
        {renderProjectCards()}
      </div>
    </div>
  );
};

// const userAccess = (projectID, userID) => {
//   const [access, setAccess] = useState("")

//   API.getCollaboration(projectID, userID)
//     // .then(resp => console.log(resp));
//     .then(resp => setAccess(resp[0].access));

//   return access;
// };

export default ProjectContainer;
