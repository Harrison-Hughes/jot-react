import React, { useEffect } from "react";
import API from "../../../../adapters/API";
import Button from "../../../../elements/Button";

const AdminCollaboratorComponent = ({ collaborator, project, user }) => {
  const updateCollaborationAccess = access => {
    API.updateCollaborationAccess(
      collaborator.user_code,
      project.project_code,
      access
    );
  };

  const removeUserFromProject = () => {
    API.removeUserFromProject(collaborator.user_code, project.project_code);
  };

  return (
    <div
      className={
        user.user_code === collaborator.user_code
          ? "collaborator-component-admin users-own-component"
          : "collaborator-component-admin"
      }
    >
      <div className="collaborator-nickname">{collaborator.nickname}</div>
      <div className="collaborator-code">{collaborator.user_code}</div>
      <div className="collaborator-access">{collaborator.access}</div>
      <div>
        {collaborator.access === "editor" && (
          <EditorOptions
            updateCollaborationAccess={access =>
              updateCollaborationAccess(access)
            }
            removeUserFromProject={() => removeUserFromProject()}
          />
        )}
        {collaborator.access === "read only" && (
          <ReadOnlyOptions
            updateCollaborationAccess={access =>
              updateCollaborationAccess(access)
            }
            removeUserFromProject={() => removeUserFromProject()}
          />
        )}
        {collaborator.access === "admin" && <p>cannot alter admin access</p>}
      </div>
    </div>
  );
};

const EditorOptions = ({
  updateCollaborationAccess,
  removeUserFromProject
}) => {
  return (
    <div className="access-button-panel">
      <Button thin positive onClick={() => updateCollaborationAccess("admin")}>
        make admin
      </Button>
      <Button
        thin
        negative
        onClick={() => updateCollaborationAccess("read only")}
      >
        make read only
      </Button>
      <Button thin negative onClick={() => removeUserFromProject()}>
        remove
      </Button>
    </div>
  );
};

const ReadOnlyOptions = ({
  updateCollaborationAccess,
  removeUserFromProject
}) => {
  return (
    <div className="access-button-panel">
      <Button thin positive onClick={() => updateCollaborationAccess("admin")}>
        make admin
      </Button>
      <Button thin positive onClick={() => updateCollaborationAccess("editor")}>
        make editor
      </Button>
      <Button thin negative onClick={() => removeUserFromProject()}>
        remove
      </Button>
    </div>
  );
};

export default AdminCollaboratorComponent;
