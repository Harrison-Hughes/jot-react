import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { API_WS_ROOT } from "../../constants/index";
import { ActionCableProvider } from "react-actioncable-provider";

import API from "../../adapters/API";
import PadHeader from "./pad/PadHeader";
import PadBody from "./pad/PadBody";
import "./Pad.css";

const Pad = ({ user, location, match }) => {
  const [pad, setPad] = useState([]);
  const { params } = match;

  useEffect(() => {
    fetchPad();
  }, []);

  const fetchPad = () => {
    if (API.hasToken) {
      API.getPad(params.padCode).then(setPad);
    }
  };

  const handleReceivedPoint = point => {
    let padClone = Object.assign({}, pad);
    let newPoints = [...padClone.points, point];
    padClone.points = newPoints;
    setPad(padClone);
  };

  return (
    <>
      {location.state.valid ? (
        <div className="pad-page">
          <PadHeader />
          <ActionCableProvider url={API_WS_ROOT}>
            <PadBody
              user={user}
              pad={pad}
              fetchPad={() => fetchPad()}
              handleReceivedPoint={point => handleReceivedPoint(point)}
            />
          </ActionCableProvider>
        </div>
      ) : (
        "you do not have access to this document"
      )}
    </>
  );
};

export default withRouter(Pad);
