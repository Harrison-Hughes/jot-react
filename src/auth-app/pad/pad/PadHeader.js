import React from "react";
import Button from "../../../elements/Button";
import { Link } from "react-router-dom";

const PadHeader = props => {
  return (
    <div className="pad-header">
      <h3>your access: {props.access}</h3>
      <Link to={`/project/${props.projectCode}`}>
        <Button thin>back to {props.projectName}</Button>
      </Link>
    </div>
  );
};

export default PadHeader;
