import React, { useState, useEffect } from "react";
import API from "../../../adapters/API";
import Button from "../../../elements/Button";

const InvitationElement = props => {
  const [project, setProject] = useState(null);
  console.log(props.invitation);

  useEffect(() => getProject(props.invitation.project_code), [
    props.invitation.project_code
  ]);

  const acceptInvitation = () => {
    API.acceptInvitation(props.invitation.id, props.nickname)
      .then(removeInvitation(props.invitation.project_code))
      .then(props.refetch)
      .catch(console.log);
  };

  const declineInvitation = invitationID => {
    API.declineInvitation(invitationID)
      .then(removeInvitation(props.invitation.project_code))
      .catch(console.log);
  };

  const removeInvitation = projCode => {
    props.removeInvitationFromList(projCode);
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
            disabled={props.nickname.length < 2 || props.nickname.length > 12}
            onClick={() => {
              acceptInvitation();
            }}
            positive
            thin
          >
            accept
          </Button>
          <Button
            onClick={() => {
              declineInvitation();
            }}
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
