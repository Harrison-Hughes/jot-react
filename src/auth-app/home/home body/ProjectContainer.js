import React, { useEffect } from "react";
import NewProjectButton from "./buttons/NewProjectButton";
import ProjectCard from "../../../elements/ProjectCard";
import NewProjectCard from "../../../elements/NewProjectCard";
import "./ProjectContainer.css";
import JoinProjectButton from "./buttons/JoinProjectButton";
import ShowInvitationsButton from "./buttons/ShowInvitationsButton";

const ProjectContainer = props => {
  // console.log(props);
  const renderProjectCards = () => {
    return (
      props.projects !== [] &&
      props.projects.map((project, i) => {
        return (
          <div key={i} className="project-container-project-card element">
            <ProjectCard
              projectID={project.id}
              userCode={props.user.user_code}
              unflippable={
                props.newProjectForm ||
                props.joinProjectForm ||
                props.invitationsList
              }
              title={project.name}
              code={project.project_code}
              status={project.open ? "open" : "private"}
              desc={project.description}
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
          <h2>YOUR PROJECTS</h2>
        </div>
        <div className="project-container-header-middle"></div>
        <div className="project-container-header-right">
          <ShowInvitationsButton
            active={props.invitationsList}
            engageInvitationsList={props.engageInvitationsList}
            numberOfInvitations={props.numberOfInvitations}
            quitForm={props.quitForm}
          />
          <JoinProjectButton
            active={props.joinProjectForm}
            engageJoinProject={props.engageJoinProject}
            quitForm={props.quitForm}
          />
          {/* <NewProjectButton
            active={props.newProjectForm}
            toggleNewProject={props.toggleNewProject}
          /> */}
        </div>
      </div>
      <div
        className={
          props.newProjectForm || props.joinProjectForm || props.invitationsList
            ? "project-container-body blur y-proximity"
            : "project-container-body y-proximity"
        }
      >
        <NewProjectCard
          deactivated={
            props.newProjectForm ||
            props.joinProjectForm ||
            props.invitationsList
          }
          engageNewProject={props.engageNewProject}
          active={props.newProjectForm}
          engageNewProject={props.engageNewProject}
        />
        {renderProjectCards()}
      </div>
    </div>
  );
};

export default ProjectContainer;
