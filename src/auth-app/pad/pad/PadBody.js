import React, { useState, useEffect } from "react";
import PointContainer from "./pad body/PointContainer";
import NewPointForm from "./pad body/NewPointForm";
import { ActionCable } from "react-actioncable-provider";
import SelectedPoint from "./pad body/SelectedPoint";

const PadBody = props => {
  const [selectedPoint, setSelectedPoint] = useState(null);

  return (
    <div className="pad-body">
      {props.pad !== [] && (
        <ActionCable
          channel={{ channel: "PointsChannel", pad: props.pad.id }}
          onReceived={resp => props.handleReceivedPoint(resp)}
        />
      )}
      <PointContainer
        setSelectedPoint={point => setSelectedPoint(point)}
        selectedPoint={selectedPoint}
        userCode={props.user.user_code}
        pad={props.pad}
      />
      <div className="new-point-form-container">
        <NewPointForm
          nickname={props.nickname}
          user={props.user}
          padId={props.pad.id}
          refetch={() => props.fetchPad()}
        />
        <SelectedPoint
          access={props.access}
          userCode={props.user.user_code}
          clearSelectedPoint={() => setSelectedPoint(null)}
          selectedPoint={selectedPoint}
        />
      </div>
    </div>
  );
};

export default PadBody;
