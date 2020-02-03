import React, { useState, useEffect } from "react";
import DocumentContainer from "./project body/DocumentContainer";
import NewDocumentForm from "./project body/NewDocumentForm";
import API from "../../../adapters/API";
import { ActionCable } from "react-actioncable-provider";

const ProjectBody = props => {
  const [newDocumentForm, setNewDocumentForm] = useState(false);
  const [project, setProject] = useState([]);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = () => {
    if (API.hasToken) {
      API.getProject(props.projectCode).then(proj => {
        setProject(proj);
        props.passProjectUp(proj);
      });
    }
  };

  const handleReceivedPad = pad => {
    let projectClone = Object.assign({}, project);
    let newPads = [...projectClone.pads, pad];
    projectClone.pads = newPads;
    setProject(projectClone);
  };

  return (
    <div className="project-body">
      {project !== [] && (
        <ActionCable
          channel={{ channel: "PadsChannel", project: project.id }}
          onReceived={resp => handleReceivedPad(resp.pad)}
        />
      )}
      <DocumentContainer
        newDocumentForm={newDocumentForm}
        toggleNewDoc={() => setNewDocumentForm(!newDocumentForm)}
        pads={project.pads}
      />
      <NewDocumentForm
        projectId={project.id}
        refetch={() => fetchProject()}
        newDocumentForm={newDocumentForm}
        toggleNewDoc={() => setNewDocumentForm(!newDocumentForm)}
      />
    </div>
  );
};

export default ProjectBody;
