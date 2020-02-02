import React from "react";
import DocumentOverview from "./document container/DocumentOverview";
import NewDocumentButton from "./document container/NewDocumentButton";

const DocumentContainer = props => {
  const renderPads = () => {
    if (!!props.pads) {
      return props.pads.map((pad, i) => {
        return <DocumentOverview key={i} pad={pad} />;
      });
    }
  };

  return (
    <div className="document-container">
      <h3>Documents:</h3>
      {renderPads()}
      <NewDocumentButton toggleNewDoc={props.toggleNewDoc} />
    </div>
  );
};

export default DocumentContainer;
