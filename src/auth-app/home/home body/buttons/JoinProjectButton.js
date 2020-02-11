import React from "react";
import Button from "../../../../elements/Button";

const JoinProjectButton = props => {
  return (
    <div className="join-project">
      <Button onClick={() => props.toggleJoinProject()}>
        {props.active ? "cancel" : "find project"}
      </Button>
    </div>
  );
};

export default JoinProjectButton;
