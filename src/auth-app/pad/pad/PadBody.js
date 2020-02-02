import React, { useState, useEffect } from "react";
import API from "../../../adapters/API";
import { ActionCable } from "react-actioncable-provider";

const PadBody = props => {
  const [pad, setPad] = useState([]);

  useEffect(() => {
    fetchPad();
  }, []);

  const fetchPad = () => {
    // if (API.hasToken) {
    //   API.getProject(props.projectCode).then(setProject);
    // }
  };

  const handleReceivedPad = point => {
    // let projectClone = Object.assign({}, project);
    // let newPads = [...projectClone.pads, pad];
    // projectClone.pads = newPads;
    // setProject(projectClone);
  };

  return (
    <div className="pad-body">
      {pad !== [] && (
        <ActionCable
          channel={{ channel: "PointsChannel", pad: pad.id }}
          onReceived={resp => handleReceivedPad(resp.point)}
        />
      )}
      pad body
      {/* <DocumentContainer
        newDocumentForm={newDocumentForm}
        toggleNewDoc={() => setNewDocumentForm(!newDocumentForm)}
        pads={project.pads}
      />
      <NewDocumentForm
        projectId={project.id}
        refetch={() => fetchProject()}
        newDocumentForm={newDocumentForm} */}
      />
    </div>
  );
};

export default PadBody;
