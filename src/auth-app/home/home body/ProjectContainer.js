import React, { useEffect } from "react";
import NewProjectButton from "./NewProjectButton";
import ProjectCard from "../../../elements/ProjectCard";
import "./ProjectContainer.css";
import JoinProjectButton from "./JoinProjectButton";

const ProjectContainer = props => {
  const renderProjectCards = () => {
    return (
      props.projects !== [] &&
      props.projects.map((project, i) => {
        return (
          <div key={i} className="project-container-project-card element">
            <ProjectCard
              unflippable={props.newProjectForm || props.joinProjectForm}
              title={project.name}
              code={project.project_code}
              status={project.open ? "open" : "false"}
              desc={project.description}
              access={"admin"}
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
        <div className="project-container-header-left"></div>
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

export default ProjectContainer;
