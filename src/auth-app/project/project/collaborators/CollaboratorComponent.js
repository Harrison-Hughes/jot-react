import React, { useEffect } from "react";

const CollaboratorComponent = ({ keyCard, collaborator }) => {
  return (
    <>
      {keyCard ? (
        <div className="collaborator-key">
          <div>nickname</div>
          <div>user code</div>
          <div>access</div>
        </div>
      ) : (
        <div className="collaborator-component">
          <div className="collaborator-nickname">{collaborator.nickname}</div>
          <div className="collaborator-code">{collaborator.user_code}</div>
          <div className="collaborator-access">access</div>
        </div>
      )}
    </>
  );
};

export default CollaboratorComponent;
