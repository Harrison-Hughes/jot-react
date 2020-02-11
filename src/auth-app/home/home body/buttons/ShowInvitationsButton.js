import React from "react";
import Button from "../../../../elements/Button";

const ShowInvitationsButton = props => {
  return (
    <div className="join-invitations">
      <Button onClick={() => props.toggleInvitationsList()}>
        {props.active
          ? "cancel"
          : `show ${props.numberOfInvitations} invitation(s)`}
      </Button>
    </div>
  );
};

export default ShowInvitationsButton;
