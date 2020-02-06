import React, { useState } from "react";
import API from "../../../adapters/API";
import FadeInDiv from "../../../elements/FadeInDiv";
import "./JoinProjectForm.css";

const JoinProjectForm = props => {
  const [projectCode, setProjectCode] = useState("");
  const [nickname, setNickname] = useState(props.user.default_nickname);

  const handleProjectCodeChange = e => {
    setProjectCode(e.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    API.joinProjectIfOpen(projectCode, props.user.user_code, nickname, "admin")
      .then(resp => resp.json())
      .then(resp => {
        if (
          resp.error === "collaboration already exists" ||
          "project is closed"
        )
          console.log(resp.error);
        else props.refetch();
      });
    setProjectCode("");
    props.toggleJoinProject();
  };

  return (
    <FadeInDiv
      className={props.joinProjectForm ? "fade-in-div on" : "fade-in-div off"}
    >
      <div className="form-style-5">
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>project code:</label>
            <input
              onChange={handleProjectCodeChange}
              type="name"
              name="name"
              placeholder="project code"
              value={projectCode}
            />
          </div>
          <input
            disabled={projectCode.length !== 8}
            type="submit"
            value="join project"
          />
        </form>
      </div>
    </FadeInDiv>
  );
};

export default JoinProjectForm;
