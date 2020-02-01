import React, { useState, useEffect } from "react";
import API from "../../../../adapters/API";

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
      API.getCollaborators(props.projectCode)
        // .then(console.log);
        .then(setCollaborators);
    }
  };

  return (
    <div className="collaborator-list">
      <h3>Collaborators:</h3>
      <ul>{renderCollaborators()}</ul>
    </div>
  );
};

export default CollaboratorList;
