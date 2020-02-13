import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import API from "../../../../adapters/API";
import Button from "../../../../elements/Button";

const SelectedDocumentPanel = ({ document, access, project, nickname }) => {
  const hist = useHistory();
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const deletePad = () => {
    API.deletePad(document.pad_code);
  };

  const editPad = (name, description) => {
    API.editPad(document.pad_code, name, description);
  };

  const openDocument = () => {
    if (docType() === "pad") {
      hist.push(`/pad/${document.pad_code}`, {
        valid: true,
        project_name: project.name,
        project_code: project.project_code,
        access: access,
        nickname: nickname
      });
    }
  };

  const docType = () => {
    if (!!document.pad_code) return "pad";
    else return "unknown";
  };

  if (!document) return <div className="no-height-div"></div>;
  else
    return (
      // <div className="document-display-body-left">
      <div className="selected-document-panel">
        <div className="selected-document">
          {access === "admin" ? (
            <EditOption
              editMode={editMode}
              enterEditMode={() => setEditMode(true)}
              leaveEditMode={() => setEditMode(false)}
              editPad={(name, description) => editPad(name, description)}
              document={document}
            />
          ) : (
            <div>
              {/* <div className="selected-document-header">
                  <h1>{document.name}</h1>
                </div> */}
              <div className="selected-document-description">
                <p>{document.description}</p>
              </div>
              {/* <div className="selected-document-type">
                  <h4>Document type: {docType()}</h4>
                </div> */}
            </div>
          )}
          <div className="selected-document-open-button">
            <Button onClick={() => openDocument()} positive thin>
              open
            </Button>
          </div>
          {access === "admin" && (
            <DeleteOption
              deleteMode={deleteMode}
              enterDeleteMode={() => setDeleteMode(true)}
              leaveDeleteMode={() => setDeleteMode(false)}
              deletePad={() => deletePad()}
            />
          )}
        </div>
      </div>
      // </div>
    );
};

const DeleteOption = ({
  deleteMode,
  enterDeleteMode,
  leaveDeleteMode,
  deletePad
}) => {
  return (
    <div className="selected-document-delete-button">
      {deleteMode ? (
        <div>
          Are you sure you want to delete this document? It cannot be
          recovered...
          <Button thin negative onClick={() => deletePad()}>
            delete
          </Button>
          <Button thin positive onClick={() => leaveDeleteMode()}>
            cancel
          </Button>
        </div>
      ) : (
        <Button thin negative onClick={() => enterDeleteMode()}>
          delete document
        </Button>
      )}
    </div>
  );
};

const EditOption = ({
  editMode,
  enterEditMode,
  leaveEditMode,
  document,
  editPad
}) => {
  const [formData, setFormData] = useState({
    name: document.name,
    description: document.description
  });

  useEffect(
    () =>
      setFormData({
        name: document.name,
        description: document.description
      }),
    [document]
  );

  const handleNameChange = e => {
    if (formData.name.length <= 15) {
      setFormData({
        ...formData,
        name: e.target.value
      });
    }
  };

  const handleDescChange = e => {
    if (
      formData.description.length <= 80 &&
      formData.description.split(" ").lastIndexOf.length <= 20 &&
      e.target.keyCode !== 8
    ) {
      setFormData({
        ...formData,
        description: e.target.value
      });
    }
  };

  const cancelUpdate = () => {
    console.log("clicked");
    leaveEditMode();
    setFormData({
      name: document.name,
      description: document.description
    });
  };

  const updateDocument = () => {
    editPad(formData.name, formData.description);
    leaveEditMode();
  };

  return (
    <div className="editable-selected-document-info">
      {editMode ? (
        <>
          <input
            onChange={handleNameChange}
            type="name"
            name="name"
            placeholder="name (max 15 chars.)"
            value={formData.name}
          ></input>
          <br />
        </>
      ) : null}

      {editMode ? (
        <textarea
          onChange={handleDescChange}
          type="name"
          name="name"
          placeholder="name (max 80 chars.)"
          value={formData.description}
        ></textarea>
      ) : (
        <p>{document.description}</p>
      )}
      {!editMode && (
        <Button thin positive onClick={() => enterEditMode()}>
          edit
        </Button>
      )}
      <br />
      {editMode && (
        <>
          <Button onClick={() => updateDocument()} positive thin>
            update
          </Button>
          <Button onClick={() => cancelUpdate()} negative thin>
            cancel
          </Button>
        </>
      )}
    </div>
  );
};

export default SelectedDocumentPanel;
