import React from "react";
import Button from "../../../../elements/Button";

const ShowInvitationsButton = props => {
  return (
    <div className="join-invitations">
      <Button thin onClick={() => props.engageInvitationsList()}>
        show {props.numberOfInvitations} invitation(s)
      </Button>
    </div>
  );
};

export default ShowInvitationsButton;
