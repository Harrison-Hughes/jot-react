import React, { useState, useEffect } from "react";
import HomeHeader from "./HomeHeader";
import HomeBody from "./HomeBody";
import API from "../../adapters/API";
import { useAlert } from "react-alert";

const Home = props => {
  const [invitations, setInvitations] = useState([]);
  const [error, setError] = useState(null);

  const alert = useAlert();

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
      .catch(
        setError
        //   errorPromise => {
        //   errorPromise.then(data => {
        //     setError(data);
        //   });
        // }
      );
  };

  let messageStyles = { color: "white", fontWeight: "bold" };

  const popUpErrorMessage = message => {
    alert.error(<div style={messageStyles}>{message}</div>);
  };

  const popUpSuccessMessage = message => {
    alert.success(<div style={messageStyles}>{message}</div>);
  };

  const removeInvitationFromList = projCode => {
    console.log(projCode, invitations);
    let newInvitations = invitations.filter(i => i.project_code !== projCode);
    setInvitations(newInvitations);
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
        popUpErrorMessage={msg => popUpErrorMessage(msg)}
        popUpSuccessMessage={msg => popUpSuccessMessage(msg)}
        removeInvitationFromList={ID => removeInvitationFromList(ID)}
        invitations={invitations}
        user={props.user}
      />
    </div>
  );
};

export default Home;
