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

  const handleNicknameChange = e => {
    setNickname(e.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    API.joinProjectIfOpen(projectCode, props.user.user_code, nickname)
      .then(resp => resp.json())
      .then(resp => {
        if (!!resp.error) props.popUpErrorMessage(resp.error);
        else {
          props.refetch();
          props.popUpSuccessMessage("project successfully joined");
        }
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
          <div className="form-field">
            <label>nickname:</label>
            <input
              onChange={handleNicknameChange}
              type="name"
              name="name"
              placeholder="how you would like to be known"
              value={nickname}
            />
          </div>
          <input
            disabled={projectCode.length !== 6 || nickname.length === 0}
            type="submit"
            value="join project"
          />
        </form>
        <button onClick={() => props.quitForm()}>cancel</button>
      </div>
    </FadeInDiv>
  );
};

export default JoinProjectForm;
