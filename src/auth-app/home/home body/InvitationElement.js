import React, { useState, useEffect } from "react";
import API from "../../../adapters/API";
import Button from "../../../elements/Button";

const InvitationElement = props => {
  const [project, setProject] = useState(null);

  useEffect(() => getProject(props.invitation.project_code), []);

  const acceptInvitation = invitationID => {
    API.acceptInvitation(invitationID, props.nickname);
  };

  const declineInvitation = invitationID => {
    API.declineInvitation(invitationID);
  };

  const getProject = projectCode => {
    API.getProject(projectCode).then(setProject);
  };

  return (
    <div>
      {!!project && (
        <div className="invitation-element">
          <h4>
            {project.name}, {props.invitation.project_code}
          </h4>
          <Button
            onClick={() => acceptInvitation(props.invitation.id)}
            positive
            thin
          >
            accept
          </Button>
          <Button
            onClick={() => declineInvitation(props.invitation.id)}
            negative
            thin
          >
            decline
          </Button>
        </div>
      )}
    </div>
  );
};

export default InvitationElement;
