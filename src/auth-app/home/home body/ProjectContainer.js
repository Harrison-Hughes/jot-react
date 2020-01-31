import React, { useState, useEffect } from 'react';
import API from '../../../adapters/API';
import ProjectOverview from './ProjectOverview';
import NewProjectButton from './NewProjectButton';

const ProjectContainer = props => {

  const renderProjects = () => {
    return props.projects !== [] && props.projects.map((project, i) => {
      return <ProjectOverview key={i} project={project}/>
  })}

  return(
    <div className="project container">
      {renderProjects()}
      <NewProjectButton toggleNewProject={props.toggleNewProject} />
    </div>
  )
}

export default ProjectContainer