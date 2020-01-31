import React, { useState, useEffect } from "react";
import DocumentOverview from "./document container/DocumentOverview";

const DocumentContainer = props => {
  const renderPads = () => {
    return props.pads.map((pad, i) => {
      return <DocumentOverview key={i} pad={pad} />;
    });
  };

  return (
    <div className="document-container">
      <h3>Documents:</h3>
      {renderPads()}
    </div>
  );
};

export default DocumentContainer;
