import React from "react";

const NewDocumentOverview = props => {
  return (
    <div className="pad-panel">
      <div className="pad-panel-left">
        <div
          onClick={() => props.toggleNewDoc()}
          className={"document-overview element"}
        >
          <h3 className="new-document-overview-h3"> - new document -</h3>
        </div>
      </div>
    </div>
  );
};

export default NewDocumentOverview;