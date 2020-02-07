import React from "react";
import Button from "../../../../elements/Button";

const ShowInvitationsButton = props => {
  return (
    <div className="join-invitations">
      <Button onClick={() => props.toggleInvitationsList()}>
        {props.active ? "cancel" : "show invitations"}
      </Button>
    </div>
  );
};

export default ShowInvitationsButton;
