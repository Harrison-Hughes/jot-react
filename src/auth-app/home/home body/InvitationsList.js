import React, { useState, useEffect } from "react";
import FadeInDiv from "../../../elements/FadeInDiv";
import "./InvitationsList.css";
import InvitationElement from "./InvitationElement";

const InvitationsList = props => {
  const [nickname, setNickname] = useState(props.user.default_nickname);
  // const [error, setError] = useState(null);

  const renderInvitations = () => {
    if (props.invitations.length === 0) {
      return <h3>you have no invitations</h3>;
    } else {
      return props.invitations.map((i, index) => {
        return (
          <InvitationElement
            removeInvitationFromList={projCode =>
              props.removeInvitationFromList(projCode)
            }
            refetch={props.refetch}
            nickname={nickname}
            invitation={i}
            key={index}
          />
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
            <label>nickname to join with:{"  "}</label>

            <input
              onChange={handleNicknameChange}
              type="name"
              name="name"
              placeholder="your nickname"
              value={nickname}
            />
            {nickname.length < 2 && <p className="tiny-warning">too short!</p>}
            {nickname.length > 12 && (
              <p className="tiny-warning-white">too long!</p>
            )}
            {nickname.length < 12 && nickname.length > 2 && (
              <p className="tiny-warning"> </p>
            )}
          </>
        )}
        {renderInvitations()}
        <button onClick={() => props.quitForm()}>cancel</button>
      </div>
    </FadeInDiv>
  );
};

export default InvitationsList;
