import React, { useState, useEffect } from "react";
import FadeInDiv from "../../../elements/FadeInDiv";

const CollaboratorList = props => {
  const renderCollaborators = () => {
    if (props.collaborators !== []) {
      return props.collaborators.map((c, i) => {
        return (
          <li key={i}>
            {c.nickname}, {c.user_code}
          </li>
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
        <h3>Collaborators:</h3>
        <ul>{renderCollaborators()}</ul>
      </FadeInDiv>
    </div>
  );
};

export default CollaboratorList;
