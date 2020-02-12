import React, { useState, useEffect } from "react";
import PointContainer from "./pad body/PointContainer";
import NewPointForm from "./pad body/NewPointForm";
import { ActionCable, ActionCableConsumer } from "react-actioncable-provider";
import SelectedPoint from "./pad body/SelectedPoint";

const PadBody = props => {
  const [selectedPoint, setSelectedPoint] = useState(null);

  useEffect(() => setSelectedPoint(selectedPoint), [selectedPoint]);

  useEffect(() => {
    if (props.cableConnection) {
      const subscription = props.cableConnection.subscriptions.create(
        { channel: "PointsChannel", pad: props.pad.id },
        {
          received: resp => props.handleReceivedPoint(resp)
        }
      );
      // return () => {
      //   // const sub = subscription;
      //   // debugger;
      //   subscription.unsubscribe();
      // };
    }
  });

  return (
    <div className="pad-body">
      {/* <ActionCableConsumer
        channel={{ channel: "PointsChannel", pad: props.pad.id }}
        onReceived={resp => props.handleReceivedPoint(resp)}
      /> */}
      {props.pad !== [] && (
        <PointContainer
          setSelectedPoint={point => setSelectedPoint(point)}
          selectedPoint={selectedPoint}
          userCode={props.user.user_code}
          pad={props.pad}
        />
      )}
      {props.access !== "read only" && (
        <div className="new-point-form-container">
          <NewPointForm
            nickname={props.nickname}
            user={props.user}
            padId={props.pad.id}
            // refetch={() => props.fetchPad()}
          />
          <SelectedPoint
            access={props.access}
            userCode={props.user.user_code}
            clearSelectedPoint={() => setSelectedPoint(null)}
            selectedPoint={selectedPoint}
          />
          }{/* <ActionCableConsumer /> */}
        </div>
      )}
    </div>
  );
};

export default PadBody;
