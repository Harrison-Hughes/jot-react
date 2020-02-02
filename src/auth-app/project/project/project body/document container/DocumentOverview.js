import React from "react";
import { Link } from "react-router-dom";

const DocumentOverview = props => {
  return (
    <div className="document-overview">
      <Link to={{ pathname: `/pad/${props.pad.pad_code}`, valid: true }}>
        <h3>{props.pad.name}</h3>
      </Link>
      <p>{props.pad.description}</p>
    </div>
  );
};

export default DocumentOverview;
