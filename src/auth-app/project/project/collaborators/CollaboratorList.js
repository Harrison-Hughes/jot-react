import React, { useEffect } from "react";
import FadeInDiv from "../../../../elements/FadeInDiv";
import "./Collaborators.css";
import CollaboratorComponent from "./CollaboratorComponent";
import InviteCollaboratorForm from "./InviteCollaboratorForm";
import AdminCollaboratorComponent from "./AdminCollaboratorComponent";

const CollaboratorList = props => {
  const renderCollaborators = () => {
    if (props.collaborators !== []) {
      let collabs = JSON.parse(JSON.stringify(props.collaborators));
      collabs.sort(function(a, b) {
        return a.access < b.access ? -1 : a.access > b.access ? 1 : 0;
      });
      return collabs.map((c, i) => {
        return (
          <div key={i}>
            <CollaboratorComponent user={props.user} collaborator={c} />
          </div>
        );
      });
    }
  };

  const renderCollaboratorsAsAdmin = () => {
    if (props.collaborators !== [] && !!props.project) {
      let collabs = JSON.parse(JSON.stringify(props.collaborators));
      collabs.sort(function(a, b) {
        return a.access < b.access ? -1 : a.access > b.access ? 1 : 0;
      });
      return collabs.map((c, i) => {
        return (
          <div key={i}>
            <AdminCollaboratorComponent
              user={props.user}
              project={props.project}
              collaborator={c}
            />
          </div>
        );
      });
    }
  };

  return (
    <div className="collaborator-list">
      <FadeInDiv
        className={
          props.showCollaborators ? "fade-in-div on" : "fade-in-div off"
        }
      >
        <div className="collaborator-background">
          <div className="collaborators-current">
            <h3>Collaborators:</h3>
            <div className="collaborator-container">
              <CollaboratorComponent
                admin={props.access === "admin"}
                keyCard
                collaborator={null}
              />
              {props.access === "admin"
                ? renderCollaboratorsAsAdmin()
                : renderCollaborators()}
            </div>
          </div>
          {props.access === "admin" && (
            <div className="collaborators-invite">
              <h3>Invite:</h3>
              <InviteCollaboratorForm
                inviteUser={userCode => props.inviteUser(userCode)}
              />
            </div>
          )}
        </div>
      </FadeInDiv>
    </div>
  );
};

export default CollaboratorList;
