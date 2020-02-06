import React, { useState, useEffect } from "react";
import ProjectContainer from "./home body/ProjectContainer";
import NewProjectForm from "./home body/NewProjectForm";
import API from "../../adapters/API";
import JoinProjectForm from "./home body/JoinProjectForm";

const HomeBody = ({ user }) => {
  const [newProjectForm, setNewProjectForm] = useState(false);
  const [joinProjectForm, setJoinProjectForm] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    API.myProjects(user.user_code).then(setProjects);
  };

  return (
    <>
      <div className="home-body">
        <ProjectContainer
          refetch={() => fetchProjects()}
          projects={projects}
          newProjectForm={newProjectForm}
          joinProjectForm={joinProjectForm}
          toggleNewProject={() => setNewProjectForm(!newProjectForm)}
          toggleJoinProject={() => setJoinProjectForm(!joinProjectForm)}
        />
      </div>
      <div className="home-body-form">
        <NewProjectForm
          user={user}
          toggleNewProject={() => setNewProjectForm(!newProjectForm)}
          refetch={() => fetchProjects()}
          newProjectForm={newProjectForm}
        />
      </div>
      <div className="home-body-form">
        <JoinProjectForm
          joinProjectForm={joinProjectForm}
          refetch={() => fetchProjects()}
          toggleJoinProject={() => setJoinProjectForm(!joinProjectForm)}
          user={user}
        />
      </div>
    </>
  );
};

export default HomeBody;
