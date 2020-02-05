import React, { useState, useEffect } from "react";
import ProjectContainer from "./home body/ProjectContainer";
import NewProjectForm from "./home body/NewProjectForm";
import API from "../../adapters/API";

const HomeBody = () => {
  const [newProjectForm, setNewProjectForm] = useState(false);
  const [joinProjectForm, setJoinProjectForm] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    if (API.hasToken) {
      API.myProjects().then(setProjects);
    }
  };

  return (
    <>
      <div className="home-body">
        <ProjectContainer
          refetch={() => fetchProjects()}
          projects={projects}
          newProjectForm={newProjectForm}
          toggleNewProject={() => setNewProjectForm(!newProjectForm)}
        />
      </div>
      <div className="home-body-form">
        <NewProjectForm
          toggleNewProject={() => setNewProjectForm(!newProjectForm)}
          refetch={() => fetchProjects()}
          newProjectForm={newProjectForm}
        />
      </div>
    </>
  );
};

export default HomeBody;
