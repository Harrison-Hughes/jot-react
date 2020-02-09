import React, { useState } from "react";
import "./Collaborators.css";

const InviteCollaboratorsForm = props => {
  const [userCode, setProjectCode] = useState("");

  const handleUserCodeChange = e => {
    setProjectCode(e.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.inviteUser(userCode);
    setProjectCode("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>User code:</label>
          <input
            onChange={handleUserCodeChange}
            type="name"
            name="name"
            placeholder="6 digits"
            value={userCode}
          />
        </div>
        <input
          disabled={userCode.length !== 6}
          type="submit"
          value="add user"
        />
      </form>
    </div>
  );
};

export default InviteCollaboratorsForm;
