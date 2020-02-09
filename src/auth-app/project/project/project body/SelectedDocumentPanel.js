import React, { useState } from "react";
import API from "../../../../adapters/API";

const SelectedDocumentPanel = ({ document }) => {
  const [editMode, setEditMode] = useState(false);
  console.log(document);

  const deletePad = () => {
    API.deletePad(document.id);
  };

  const editPad = () => {};

  return (
    <div className="selected-document-panel">
      {!document ? (
        <div className="no-selected-document">
          <h1>no document selected</h1>
        </div>
      ) : (
        <div className="selected-document">
          <div className="selected-document-header">
            <h1>{document.name}</h1>
          </div>
          <div className="selected-document-description">
            <p>{document.description}</p>
          </div>
          <div className="selected-document-type"></div>
          <div className="selected-document-leave-button"></div>
          <div className="selected-document-open-button"></div>
        </div>
      )}
    </div>
  );
};

export default SelectedDocumentPanel;
