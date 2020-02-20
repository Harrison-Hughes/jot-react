import React, { useEffect, useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import API from "../../adapters/API";
import PadHeader from "./pad/PadHeader";
import PadBody from "./pad/PadBody";
import "./Pad.css";

// const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const Pad = ({ user, location, match, cableConnection }) => {
  const [pad, setPad] = useState(null);
  const { params } = match;
  const padSubscriptionRef = useRef(null);

  useEffect(() => {
    fetchPad();
  }, []);

  const fetchPad = () => {
    if (API.hasToken) {
      API.getPad(params.padCode).then(setPad);
    }
  };

  if (cableConnection && pad && padSubscriptionRef.current === null) {
    // console.log("pad subscribed");
    padSubscriptionRef.current = cableConnection.subscriptions.create(
      { channel: "PointsChannel", pad: pad.id },
      {
        received: resp => handleReceivedPoint(resp)
      }
    );
  }

  useEffect(() => {
    return () => {
      // console.log("pad unsubscribed");
      padSubscriptionRef.current && padSubscriptionRef.current.unsubscribe();
    };
  }, []);

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
    console.log(resp);
    if (!!resp.point) {
      setPad(pad => ({ ...pad, points: [...pad.points, resp.point] }));
    }

    if (!!resp.json && !!resp.json.action) {
      if (resp.json.action === "delete") {
        setPad(pad => ({
          ...pad,
          points: pad.points.filter(p => p.id !== resp.json.id)
        }));
      } else if (resp.json.action === "update") {
        console.log(resp.json.text);
        setPad(pad => ({
          ...pad,
          points: pad.points.map(point =>
            point.id !== resp.json.id
              ? point
              : { ...point, text: resp.json.text }
          )
        }));
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

          <div className="left-strip"></div>
          <div className="right-strip"></div>
        </div>
      ) : (
        "you do not have access to this document"
      )}
    </>
  );
};

export default withRouter(Pad);
