import React, { useState, useEffect, useRef } from "react";
import HomeHeader from "./HomeHeader";
import HomeBody from "./HomeBody";
import API from "../../adapters/API";
import { useAlert } from "react-alert";

const Home = props => {
  const [invitations, setInvitations] = useState([]);
  const [error, setError] = useState(null);
  const homeSubscriptionRef = useRef(null);

  const alert = useAlert();

  useEffect(() => fetchInvitations(), []);

  useEffect(() => console.log(error), [error]);

  if (
    props.cableConnection &&
    props.user.id &&
    homeSubscriptionRef.current === null
  ) {
    // debugger;
    console.log("invitations subscribed");
    homeSubscriptionRef.current = props.cableConnection.subscriptions.create(
      {
        channel: "InvitationsChannel",
        user: props.user.id
      },
      {
        received: resp => handleReceivedInvitation(resp.invitation)
      }
    );
  }

  useEffect(() => {
    return () => {
      console.log("invitations unsubscribed");
      homeSubscriptionRef.current && homeSubscriptionRef.current.unsubscribe();
    };
  }, []);

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

  const popUpAlert = message => {
    alert.info(<div style={messageStyles}>{message}</div>);
  };

  const removeInvitationFromList = projCode => {
    console.log(projCode, invitations);
    let newInvitations = invitations.filter(i => i.project_code !== projCode);
    setInvitations(newInvitations);
  };

  const handleReceivedInvitation = invitation => {
    console.log(invitation);
    setInvitations([...invitations, invitation]);
    popUpAlert("you have 1 new invitation");
  };

  return (
    <div className="home container">
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
