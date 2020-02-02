import React from "react";
import Button from "../../../../elements/Button";

const NewPointButton = props => {
  return (
    <div className="new-point">
      <Button onClick={() => props.toggleNewPoint()}>new point</Button>
    </div>
  );
};

export default NewPointButton;
