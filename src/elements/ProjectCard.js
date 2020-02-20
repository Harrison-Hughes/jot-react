import React, { useState, useEffect } from "react";
import API from "../adapters/API";
import { Link } from "react-router-dom";

import "./ProjectCard.css";

const ProjectCard = props => {
  const [access, setAccess] = useState("-");

  useEffect(() => fetchAccess(), []);

  const fetchAccess = () => {
    API.getCollaboration(props.code, props.userCode).then(resp => {
      if (!!resp[0]) setAccess(resp[0].access);
    });
  };

  return (
    <div className={props.unflippable ? "project-card-static" : "project-card"}>
      <div className="project-card-inner">
        <div className="project-card-front">
          <h3>{props.title}</h3>
          <p>{props.desc}</p>
        </div>
        <div className="project-card-back">
          <h3 className="project-card-back-title">{props.title}</h3>
          <div className="project-card-back-grid">
            <div className="right ">project code:</div>{" "}
            <div className="left ">{props.code}</div>
            <div className="right ">access:</div>{" "}
            <div className="left ">{access}</div>
            <div className="right ">status:</div>{" "}
            <div className="left ">{props.status}</div>
            <div className="right ">last edited:</div>{" "}
            <div className="left ">{lastEdited(props.lastEdited)}</div>
          </div>
          <Link to={`/project/${props.code}`}>
            <button className="cente">open</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const dateDiff = (last, curr) => {
  // [day, month, year]
  let a = last.split("-").reverse();
  let b = curr.split("/");
  if (JSON.stringify(a) === JSON.stringify(b)) return "same date";
  else if (a[2] === b[2] && a[1] === b[1]) {
    let dayDiff = parseInt(b[0]) - parseInt(a[0]);
    return dayDiff === 1 ? "1 day ago" : `${dayDiff} days ago`;
  } else if (a[2] === b[2]) {
    let monthDiff = parseInt(b[1]) - parseInt(a[1]);
    return monthDiff === 1 ? "1 month ago" : `${monthDiff} months ago`;
  } else {
    let yearDiff = parseInt(b[2]) - parseInt(a[2]);
    return yearDiff === 1 ? "1 year ago" : `${yearDiff} months ago`;
  }
};

const timeDiff = (last, curr) => {
  let a = last.split(":");
  let b = curr.split(":");
  if (a[0] === b[0] && a[1] === b[1]) return "just now";
  else {
    return `${a[0]}:${a[1]}`;
  }
};

const lastEdited = lastEditedDateTime => {
  let currDate = new Date().toLocaleDateString();
  let currTime = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "numeric",
    minute: "numeric"
  });
  let dDiff = dateDiff(lastEditedDateTime.split("T")[0], currDate);
  if (dDiff === "same date") {
    return timeDiff(lastEditedDateTime.split("T")[1], currTime);
  } else return dDiff;
};

export default ProjectCard;

// create with <ProjectCard title={...} code={...} status={...} desc={...} access={...} lastEdited={...}/>
