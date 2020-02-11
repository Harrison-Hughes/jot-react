import React, { useState, useEffect } from "react";
import HomeHeader from "./HomeHeader";
import HomeBody from "./HomeBody";
import { API_WS_ROOT } from "../../constants/index";
import { ActionCableProvider, ActionCable } from "react-actioncable-provider";
import API from "../../adapters/API";

const Home = props => {
  const [invitations, setInvitations] = useState([]);

  useEffect(() => fetchInvitations(), []);

  const fetchInvitations = () => {
    API.myInvitations(props.user.user_code).then(resp => {
      if (!!resp.error) {
        console.log(resp.error);
      } else setInvitations(resp);
    });
  };

  const handleReceivedInvitation = invitation => {
    setInvitations([...invitations, invitation]);
  };

  return (
    <div className="home container">
      <ActionCableProvider url={API_WS_ROOT}>
        {!!props.user && (
          <ActionCable
            channel={{ channel: "InvitationsChannel", user: props.user.id }}
            onReceived={resp => handleReceivedInvitation(resp.invitation)}
          />
        )}
        <HomeHeader logOut={() => props.logOut()} user={props.user} />
        <HomeBody invitations={invitations} user={props.user} />
      </ActionCableProvider>
    </div>
  );
};

export default Home;
