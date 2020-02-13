import React, { useEffect, useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import API from "../../adapters/API";
import PadHeader from "./pad/PadHeader";
import PadBody from "./pad/PadBody";
import "./Pad.css";

const Pad = ({ user, location, match, cableConnection }) => {
  const [pad, setPad] = useState(null);
  const { params } = match;
  const padSubscriptionRef = useRef();

  useEffect(() => {
    fetchPad();
  }, []);

  const fetchPad = () => {
    if (API.hasToken) {
      API.getPad(params.padCode).then(setPad);
    }
  };

  useEffect(() => {
    if (cableConnection && pad) {
      padSubscriptionRef.current = cableConnection.subscriptions.create(
        { channel: "PointsChannel", pad: pad.id },
        {
          received: resp => handleReceivedPoint(resp)
        }
      );
    }
    return () => {
      padSubscriptionRef.current && padSubscriptionRef.current.unsubscribe();
    };
  }, [cableConnection, pad]);

  if (!location.state)
    return <div>you do not have access to this document</div>;

  const {
    project_name,
    project_code,
    valid,
    access,
    nickname
  } = location.state;

  const handleReceivedPoint = resp => {
    // console.log(resp);
    if (!!resp.point) {
      let padClone = Object.assign({}, pad);
      let newPoints = [...padClone.points, resp.point];
      padClone.points = newPoints;
      setPad(padClone);
    }

    if (!!resp.json && !!resp.json.action) {
      if (resp.json.action === "delete") {
        let padClone = Object.assign({}, pad);
        let newPoints = padClone.points.filter(p => p.id !== resp.json.id);
        padClone.points = newPoints;
        setPad(padClone);
      } else if (resp.json.action === "update") {
        console.log(resp.json.text);
        let padClone = Object.assign({}, pad);
        let newPoints = padClone.points.map(point => {
          if (point.id !== resp.json.id) return point;
          else {
            let pointClone = Object.assign({}, point);
            pointClone.text = resp.json.text;
            return pointClone;
          }
        });
        padClone.points = newPoints;
        setPad(padClone);
      }
    }
  };

  return (
    <>
      {valid ? (
        <div className="pad-page">
          <PadHeader
            projectName={project_name}
            projectCode={project_code}
            access={access}
          />
          <PadBody
            cableConnection={cableConnection}
            nickname={nickname}
            access={access}
            user={user}
            pad={pad}
            // fetchPad={() => fetchPad()}
            handleReceivedPoint={point => handleReceivedPoint(point)}
          />
        </div>
      ) : (
        "you do not have access to this document"
      )}
    </>
  );
};

export default withRouter(Pad);
