import React from "react";
import Button from "../../../../elements/Button";

const NewProjectButton = props => {
  return (
    <div className="new-project">
      <Button onClick={() => props.toggleNewProject()}>
        {props.active ? "cancel" : "new project"}
      </Button>
    </div>
  );
};

export default NewProjectButton;
