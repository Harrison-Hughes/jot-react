import React, { useState, useEffect } from "react";
import HomeHeader from "./HomeHeader";
import HomeBody from "./HomeBody";
import API from "../../adapters/API";

const Home = props => {
  const [invitations, setInvitations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => fetchInvitations(), []);

  useEffect(() => console.log(error), [error]);

  useEffect(() => {
    if (props.cableConnection) {
      const subscription = props.cableConnection.subscriptions.create(
        {
          channel: "InvitationsChannel",
          user: props.user.id
        },
        {
          received: resp => handleReceivedInvitation(resp.invitation)
        }
      );
    }
  });

  const fetchInvitations = () => {
    API.myInvitations(props.user.user_code)
      .then(setInvitations)
      .catch(errorPromise => {
        errorPromise.then(data => {
          setError(data);
        });
      });
  };
  // console.log(invitations);

  const removeInvitationFromList = ID => {
    console.log(ID);
    // let newInvitations = invitations.filter(
    //   i => i.project_code !== invitationID
    // );
    // setInvitations(newInvitations);
  };

  const handleReceivedInvitation = invitation => {
    console.log(invitation);
    setInvitations([...invitations, invitation]);
  };

  return (
    <div className="home container">
      {/* {!!props.user && (
        <ActionCableConsumer
          channel={{ channel: "InvitationsChannel", user: props.user.id }}
          onReceived={resp => handleReceivedInvitation(resp.invitation)}
          onConnected={() => console.log("I'm connected twice")}
          // onDisconnected={() => console.log("I'm disconnected")}
        />
      )} */}
      <HomeHeader logOut={() => props.logOut()} user={props.user} />
      <HomeBody
        removeInvitationFromList={projCode =>
          removeInvitationFromList(projCode)
        }
        invitations={invitations}
        user={props.user}
      />
    </div>
  );
};

export default Home;
