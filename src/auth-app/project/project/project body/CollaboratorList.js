import React, { useState, useEffect } from "react";
import API from "../../../../adapters/API";
import FadeInDiv from "../../../../elements/FadeInDiv";

const CollaboratorList = props => {
  const [collaborators, setCollaborators] = useState([]);

  const renderCollaborators = () => {
    if (collaborators !== []) {
      return collaborators.map((c, i) => {
        return (
          <li key={i}>
            {c.nickname}, {c.user_code}
          </li>
        );
      });
    }
  };

  useEffect(() => fetchCollaborators(), []);

  const fetchCollaborators = () => {
    if (API.hasToken) {
      API.getCollaborators(props.projectCode).then(setCollaborators);
    }
  };

  return (
    <FadeInDiv
      className={props.CollaboratorList ? "fade-in-div on" : "fade-in-div off"}
    >
      <div className="collaborator-list">
        <h3>Collaborators:</h3>
        <ul>{renderCollaborators()}</ul>
      </div>
    </FadeInDiv>
  );
};

export default CollaboratorList;
