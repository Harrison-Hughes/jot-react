import React, { useState, useEffect } from "react";
import PointContainer from "./pad body/PointContainer";
import NewPointForm from "./pad body/NewPointForm";
import SelectedPoint from "./pad body/SelectedPoint";

const PadBody = props => {
  const [selectedPoint, setSelectedPoint] = useState(null);

  if (props.pad === null) return <h1>No pad yet...</h1>;
  return (
    <div className="pad-body">
      {props.pad !== [] && (
        <PointContainer
          access={props.access}
          setSelectedPoint={point => {
            if (selectedPoint === point) {
              setSelectedPoint(null);
            } else setSelectedPoint(point);
          }}
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
          />
          <SelectedPoint
            access={props.access}
            userCode={props.user.user_code}
            clearSelectedPoint={() => setSelectedPoint(null)}
            selectedPoint={selectedPoint}
          />
        </div>
      )}
    </div>
  );
};

export default PadBody;
