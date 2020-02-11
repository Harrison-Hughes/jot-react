import React from "react";

const CollaboratorComponent = ({ admin, keyCard, collaborator, user }) => {
  return (
    <>
      {keyCard ? (
        <div className={admin ? `collaborator-key-admin` : `collaborator-key`}>
          <div>nickname</div>
          <div>user code</div>
          <div>access</div>
        </div>
      ) : (
        <div
          className={
            user.user_code === collaborator.user_code
              ? "collaborator-component users-own-component"
              : "collaborator-component"
          }
        >
          <div className="collaborator-nickname">{collaborator.nickname}</div>
          <div className="collaborator-code">{collaborator.user_code}</div>
          <div className="collaborator-access">{collaborator.access}</div>
        </div>
      )}
    </>
  );
};

export default CollaboratorComponent;
