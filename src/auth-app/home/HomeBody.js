import React, { useState, useEffect } from "react";
import ProjectContainer from "./home body/ProjectContainer";
import NewProjectForm from "./home body/NewProjectForm";
import JoinProjectForm from "./home body/JoinProjectForm";
import InvitationsList from "./home body/InvitationsList";
import API from "../../adapters/API";

const HomeBody = ({ user, invitations }) => {
  const [newProjectForm, setNewProjectForm] = useState(false);
  const [joinProjectForm, setJoinProjectForm] = useState(false);
  const [invitationsList, setInvitationsList] = useState(false);
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
          user={user}
          refetch={() => fetchProjects()}
          projects={projects}
          newProjectForm={newProjectForm}
          joinProjectForm={joinProjectForm}
          invitationsList={invitationsList}
          numberOfInvitations={invitations.length}
          toggleNewProject={() => setNewProjectForm(!newProjectForm)}
          toggleJoinProject={() => setJoinProjectForm(!joinProjectForm)}
          toggleInvitationsList={() => setInvitationsList(!invitationsList)}
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
      <div className="home-body-form">
        <InvitationsList
          user={user}
          invitationsList={invitationsList}
          invitations={invitations}
          refetch={() => fetchProjects()}
          toggleInvitationsList={() => setInvitationsList(!invitationsList)}
        />
      </div>
    </>
  );
};

export default HomeBody;
