import React, { useEffect } from "react";
import ProjectOverview from "./ProjectOverview";
import NewProjectButton from "./NewProjectButton";
import ProjectCard from "../../../elements/ProjectCard";

const ProjectContainer = props => {
  console.log(props.projects);
  const renderProjects = () => {
    return (
      props.projects !== [] &&
      props.projects.map((project, i) => {
        return <ProjectOverview key={i} project={project} />;
      })
    );
  };

  const renderProjectCards = () => {
    return (
      props.projects !== [] &&
      props.projects.map((project, i) => {
        return (
          <ProjectCard
            key={i}
            title={project.name}
            code={project.project_code}
            status={project.open ? "open" : "false"}
            desc={project.description}
            access={"admin"}
            lastEdited={project.updated_at}
          />
        );
      })
    );
  };

  useEffect(() => {
    props.refetch();
  }, []);

  return (
    <div className="project-container">
      {/* {renderProjects()} */}
      {renderProjectCards()}
      <NewProjectButton toggleNewProject={props.toggleNewProject} />
    </div>
  );
};

export default ProjectContainer;
