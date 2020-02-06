import React from "react";
import { useHistory } from "react-router-dom";
import API from "../../../../../adapters/API";

const DocumentOverview = props => {
  const hist = useHistory();

  const deletePad = () => {
    API.deletePad(props.pad.id);
  };

  return (
    <div className="pad-panel">
      <div className="pad-panel-left">
        <div
          onClick={() => {
            hist.push(`/pad/${props.pad.pad_code}`, { valid: true });
          }}
          className="document-overview element"
        >
          <h3 className="document-overview-h3">{props.pad.name}</h3>
          <p className="document-overview-p">{props.pad.description}</p>
        </div>
      </div>
      <div className="pad-panel-right">
        {/* <button
          onClick={() => {
            deletePad();
          }}
        >
          delete
        </button> */}
      </div>
    </div>
  );
};

export default DocumentOverview;
