import React, { useState, useEffect } from "react";
import ProjectOverview from "./ProjectOverview";
import NewProjectButton from "./NewProjectButton";

const ProjectContainer = props => {
  const renderProjects = () => {
    return (
      props.projects !== [] &&
      props.projects.map((project, i) => {
        return <ProjectOverview key={i} project={project} />;
      })
    );
  };

  useEffect(() => {
    props.refetch();
  }, []);

  return (
    <div className="project-container">
      {renderProjects()}
      <NewProjectButton toggleNewProject={props.toggleNewProject} />
    </div>
  );
};

export default ProjectContainer;
