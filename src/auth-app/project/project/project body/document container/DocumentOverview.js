import React, { useState, useEffect } from "react";

const DocumentOverview = props => {
  return (
    <div className="document-overview">
      <h3>{props.pad.name}</h3>
      <p>{props.pad.description}</p>
    </div>
  );
};

export default DocumentOverview;
