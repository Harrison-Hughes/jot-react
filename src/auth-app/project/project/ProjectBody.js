import React, { useState, useEffect } from "react";
import DocumentContainer from "./project body/DocumentContainer";
import { ActionCable, ActionCableConsumer } from "react-actioncable-provider";

const ProjectBody = props => {
  const [project, setProject] = useState(props.project);

  useEffect(() => setProject(props.project), [props]);

  useEffect(() => {
    if (props.cableConnection && project) {
      const subscription = props.cableConnection.subscriptions.create(
        { channel: "PadsChannel", project: project.id },
        {
          received: resp => handleReceivedPad(resp)
        }
      );
    }
  });

  const handleReceivedPad = pad => {
    let projectClone = Object.assign({}, project);
    let newPads = [...projectClone.pads, pad];
    projectClone.pads = newPads;
    setProject(projectClone);
  };

  return (
    <div className="project-body">
      {/* {project !== null && (
        <ActionCableConsumer
          channel={{ channel: "PadsChannel", project: project.id }}
          onReceived={resp => handleReceivedPad(resp.pad)}
          onDisconnected={() => console.log("I'm disconnected, Pads channel")}
          onConnected={() => console.log("I'm connected, Pads channel")}
        />
      )} */}
      <DocumentContainer
        nickname={props.nickname}
        project={props.project}
        access={props.access}
        someFormPresent={props.someFormPresent}
        showNewDocumentForm={props.showNewDocumentForm}
        toggleNewDoc={() => props.toggleNewDoc()}
        pads={!!project && project.pads}
      />
    </div>
  );
};

export default ProjectBody;
