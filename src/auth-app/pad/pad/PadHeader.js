import React from "react";
import Button from "../../../elements/Button";
import { Link } from "react-router-dom";

const PadHeader = props => {
  return (
    <div className="pad-header">
      <div className="pad-header-1">
        <h3>your access: {props.access}</h3>
      </div>
      <div className="pad-header-2">
        <h1>{props.projectName}</h1>
      </div>
      <div className="pad-header-3">
        <Link to={`/project/${props.projectCode}`}>
          <Button thin>back to {props.projectName}</Button>
        </Link>
      </div>
    </div>
  );
};

export default PadHeader;
