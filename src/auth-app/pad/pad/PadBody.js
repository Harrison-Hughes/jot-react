import React, { useState, useEffect } from "react";
import API from "../../../adapters/API";
import { ActionCable } from "react-actioncable-provider";
import PointContainer from "./pad body/PointContainer";
import NewPointForm from "./pad body/NewPointForm";

const PadBody = props => {
  const [newPointForm, setNewPointForm] = useState(false);
  const [pad, setPad] = useState([]);

  useEffect(() => {
    fetchPad();
  }, []);

  const fetchPad = () => {
    if (API.hasToken) {
      API.getPad(props.padCode).then(setPad);
    }
  };

  const handleReceivedPoint = point => {
    let padClone = Object.assign({}, pad);
    let newPoints = [...padClone.points, point];
    padClone.points = newPoints;
    setPad(padClone);
  };

  return (
    <div className="pad-body">
      {pad !== [] && (
        <ActionCable
          channel={{ channel: "PointsChannel", pad: pad.id }}
          onReceived={resp => handleReceivedPoint(resp.point)}
        />
      )}
      pad body
      <PointContainer
        newPointForm={newPointForm}
        toggleNewPoint={() => setNewPointForm(!newPointForm)}
        points={pad.points}
      />
      <NewPointForm
        user={props.user}
        padId={pad.id}
        refetch={() => fetchPad()}
        newPointForm={newPointForm}
      />
    </div>
  );
};

export default PadBody;
