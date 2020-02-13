import React, { useState, useEffect } from "react";
import DocumentContainer from "./project body/DocumentContainer";

const ProjectBody = props => {
  const [project, setProject] = useState(props.project);

  useEffect(() => setProject(props.project), [props]);

  useEffect(() => {
    if (props.cableConnection && project) {
      const subscription = props.cableConnection.subscriptions.create(
        { channel: "PadsChannel", project: project.id },
        {
          received: resp => handleUpdate(resp)
        }
      );
    }
  });

  const handleUpdate = resp => {
    // console.log(resp);
    // console.log(resp.pad);
    if (!!resp.pad) {
      let pad = resp.pad;
      let projectClone = Object.assign({}, project);
      let newPads = [...projectClone.pads, pad];
      projectClone.pads = newPads;
      setProject(projectClone);
    } else props.refetch();
  };

  const editPad = newDetails => {
    let projectClone = Object.assign({}, project);
    let newPads = project.pads.map(pad => {
      if (pad.id === newDetails.id) return newDetails;
      else return pad;
    });
    projectClone.pads = newPads;
    setProject(projectClone);
  };

  return (
    <div className="project-body">
      <DocumentContainer
        engageShowNewDocumentForm={() => props.engageShowNewDocumentForm()}
        refetch={() => props.refetch()}
        nickname={props.nickname}
        project={props.project}
        access={props.access}
        someFormPresent={props.someFormPresent}
        showNewDocumentForm={props.showNewDocumentForm}
        toggleNewDoc={() => props.toggleNewDoc()}
        pads={!!project && project.pads}
        editPad={newDetails => editPad(newDetails)}
      />
    </div>
  );
};

export default ProjectBody;
