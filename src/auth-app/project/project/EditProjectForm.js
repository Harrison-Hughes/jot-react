import React, { useState, useEffect } from "react";
import FadeInDiv from "../../../elements/FadeInDiv";

const EditProjectForm = props => {
  return (
    <div className="collaborator-list">
      <FadeInDiv
        className={props.showEditForm ? "fade-in-div on" : "fade-in-div off"}
      >
        <h1>edit project form</h1>
      </FadeInDiv>
    </div>
  );
};

export default EditProjectForm;
