import React from "react";
import Button from "../../../../elements/Button";

const JoinProjectButton = props => {
  return (
    <div className="join-project">
      <Button thin onClick={() => props.engageJoinProject()}>
        find project
      </Button>
    </div>
  );
};

export default JoinProjectButton;
