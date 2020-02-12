import React, { useState, useEffect } from "react";
import ProjectContainer from "./home body/ProjectContainer";
import NewProjectForm from "./home body/NewProjectForm";
import JoinProjectForm from "./home body/JoinProjectForm";
import InvitationsList from "./home body/InvitationsList";
import API from "../../adapters/API";

const HomeBody = ({ user, invitations, removeInvitationFromList }) => {
  const [newProjectForm, setNewProjectForm] = useState(false);
  const [joinProjectForm, setJoinProjectForm] = useState(false);
  const [invitationsList, setInvitationsList] = useState(false);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => console.log(error), [error]);

  const fetchProjects = () => {
    API.myProjects(user.user_code).then(setProjects);
    // .catch(errorPromise => {
    //   errorPromise.then(data => {
    //     setError(data);
    //   });
    // });
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
          engageNewProject={() => {
            setNewProjectForm(true);
            setJoinProjectForm(false);
            setInvitationsList(false);
          }}
          engageJoinProject={() => {
            setNewProjectForm(false);
            setJoinProjectForm(true);
            setInvitationsList(false);
          }}
          engageInvitationsList={() => {
            setNewProjectForm(false);
            setJoinProjectForm(false);
            setInvitationsList(true);
          }}
          quitForm={() => {
            setNewProjectForm(false);
            setJoinProjectForm(false);
            setInvitationsList(false);
          }}
        />
      </div>
      <div className="home-body-form">
        <NewProjectForm
          user={user}
          toggleNewProject={() => setNewProjectForm(!newProjectForm)}
          refetch={() => fetchProjects()}
          newProjectForm={newProjectForm}
          quitForm={() => {
            setNewProjectForm(false);
            setJoinProjectForm(false);
            setInvitationsList(false);
          }}
        />
      </div>
      <div className="home-body-form">
        <JoinProjectForm
          joinProjectForm={joinProjectForm}
          refetch={() => fetchProjects()}
          toggleJoinProject={() => setJoinProjectForm(!joinProjectForm)}
          user={user}
          quitForm={() => {
            setNewProjectForm(false);
            setJoinProjectForm(false);
            setInvitationsList(false);
          }}
        />
      </div>
      <div className="home-body-form">
        <InvitationsList
          user={user}
          invitationsList={invitationsList}
          invitations={invitations}
          refetch={() => fetchProjects()}
          toggleInvitationsList={() => setInvitationsList(!invitationsList)}
          quitForm={() => {
            setNewProjectForm(false);
            setJoinProjectForm(false);
            setInvitationsList(false);
          }}
          removeInvitationFromList={ID => removeInvitationFromList(ID)}
        />
      </div>
    </>
  );
};

export default HomeBody;
