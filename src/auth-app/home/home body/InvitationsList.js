import React, { useState, useEffect } from "react";
import FadeInDiv from "../../../elements/FadeInDiv";
import "./InvitationsList.css";
import InvitationElement from "./InvitationElement";

const InvitationsList = props => {
  const [nickname, setNickname] = useState(props.user.default_nickname);

  const renderInvitations = () => {
    if (props.invitations.length === 0) {
      return <h3>you have no invitations</h3>;
    } else {
      return props.invitations.map((i, index) => {
        return (
          <InvitationElement nickname={nickname} invitation={i} key={index} />
        );
      });
    }
  };

  const handleNicknameChange = e => {
    setNickname(e.target.value);
  };

  return (
    <FadeInDiv
      className={props.invitationsList ? "fade-in-div on" : "fade-in-div off"}
    >
      <div className="invitations-list">
        {props.invitations.length !== 0 && (
          <>
            <label>nickname to join with:</label>
            <input
              onChange={handleNicknameChange}
              type="name"
              name="name"
              placeholder="project code"
              value={nickname}
            />
          </>
        )}
        {renderInvitations()}
      </div>
    </FadeInDiv>
  );
};

export default InvitationsList;
