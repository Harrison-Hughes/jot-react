import React, { useEffect } from "react";
import FadeInDiv from "../../../../elements/FadeInDiv";
import "./Collaborators.css";
import CollaboratorComponent from "./CollaboratorComponent";
import InviteCollaboratorForm from "./InviteCollaboratorForm";

const CollaboratorList = props => {
  const renderCollaborators = () => {
    if (props.collaborators !== []) {
      return props.collaborators.map((c, i) => {
        return (
          <div key={i}>
            <CollaboratorComponent access={props.access} collaborator={c} />
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
              <CollaboratorComponent keyCard collaborator={null} />
              {renderCollaborators()}
            </div>
          </div>
          <div className="collaborators-invite">
            <h3>Invite:</h3>
            <InviteCollaboratorForm
              inviteUser={userCode => props.inviteUser(userCode)}
            />
          </div>
        </div>
      </FadeInDiv>
    </div>
  );
};

export default CollaboratorList;
