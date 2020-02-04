import React from "react";
import { useHistory } from "react-router-dom";

const DocumentOverview = props => {
  const hist = useHistory();

  return (
    <div
      onClick={() => {
        hist.push(`/pad/${props.pad.pad_code}`, { valid: true });
      }}
      className="document-overview element"
    >
      <h3 className="document-overview-h3">{props.pad.name}</h3>
      <p className="document-overview-p">{props.pad.description}</p>
    </div>
  );
};

export default DocumentOverview;
