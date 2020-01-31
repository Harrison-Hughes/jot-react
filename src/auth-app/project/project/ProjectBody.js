import React, { useState, useEffect } from "react";
import UpdateLog from "./project body/UpdateLog";
import DocumentContainer from "./project body/DocumentContainer";
import NewDocumentForm from "./project body/NewDocumentForm";
import API from "../../../adapters/API";

const ProjectBody = props => {
  const [newDocumentForm, setNewDocumentForm] = useState(false);
  const [project, setProject] = useState([]);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = () => {
    if (API.hasToken) {
      API.getProject(props.projectCode).then(setProject);
    }
  };

  return (
    <div className="project-body">
      <UpdateLog />
      <DocumentContainer
        newDocumentForm={newDocumentForm}
        toggleNewDoc={() => setNewDocumentForm(!newDocumentForm)}
        pads={project.pads}
      />
      <NewDocumentForm
        projectId={project.id}
        refetch={() => fetchProject()}
        newDocumentForm={newDocumentForm}
      />
    </div>
  );
};

export default ProjectBody;
