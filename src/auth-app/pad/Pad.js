import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
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
    debugger;
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
            nickname={nickname}
            access={access}
            user={user}
            pad={pad}
            fetchPad={() => fetchPad()}
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
