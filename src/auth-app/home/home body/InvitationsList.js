import React, { useState, useEffect } from "react";
import FadeInDiv from "../../../elements/FadeInDiv";
import "./NewProjectForm.css";
import InvitationElement from "./InvitationElement";

const InvitationsList = props => {
  const [nicknameForm, setNicknameForm] = useState(false);
  const renderInvitations = () => {
    if (props.invitations.length === 0) {
      return <h3>you have no invitations</h3>;
    } else {
      return props.invitations.map((i, index) => {
        return <InvitationElement invitation={i} key={index} />;
      });
    }
  };

  return (
    <FadeInDiv
      className={props.invitationsList ? "fade-in-div on" : "fade-in-div off"}
    >
      <div className="form-style-5">{renderInvitations()}</div>
    </FadeInDiv>
  );
};

export default InvitationsList;
