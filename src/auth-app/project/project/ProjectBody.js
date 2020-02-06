import React, { useState, useEffect } from "react";
import DocumentContainer from "./project body/DocumentContainer";
import { ActionCable } from "react-actioncable-provider";

const ProjectBody = props => {
  const [project, setProject] = useState(props.project);
  const [selectedDoc, setSelectedDoc] = useState(null);

  useEffect(() => setProject(props.project), [props]);

  const handleReceivedPad = pad => {
    let projectClone = Object.assign({}, project);
    let newPads = [...projectClone.pads, pad];
    projectClone.pads = newPads;
    setProject(projectClone);
  };

  return (
    <div className="project-body">
      {project !== null && (
        <ActionCable
          channel={{ channel: "PadsChannel", project: project.id }}
          onReceived={resp => handleReceivedPad(resp.pad)}
        />
      )}
      <DocumentContainer
        someFormPresent={props.someFormPresent}
        showNewDocumentForm={props.showNewDocumentForm}
        toggleNewDoc={() => props.toggleNewDoc()}
        pads={!!project && project.pads}
      />
    </div>
  );
};

export default ProjectBody;
