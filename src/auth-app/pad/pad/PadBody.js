import React, { useState } from "react";
import PointContainer from "./pad body/PointContainer";
import NewPointForm from "./pad body/NewPointForm";
import { ActionCable } from "react-actioncable-provider";

const PadBody = props => {
  return (
    <div className="pad-body">
      {props.pad !== [] && (
        <ActionCable
          channel={{ channel: "PointsChannel", pad: props.pad.id }}
          onReceived={resp => props.handleReceivedPoint(resp.point)}
        />
      )}
      <PointContainer pad={props.pad} />
      <div className="new-point-form-container">
        <NewPointForm
          user={props.user}
          padId={props.pad.id}
          refetch={() => props.fetchPad()}
        />
      </div>
    </div>
  );
};

export default PadBody;
