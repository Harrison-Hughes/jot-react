import React, { useState, useEffect } from 'react';
import API from '../../../adapters/API';
import ProjectOverview from './ProjectOverview';
import NewProjectForm from './NewProjectForm';
import Button from '../../../elements/Button';

const NewProjectButton = props => {
  
  return(
    <div className="new project">
      <Button onClick={() => props.toggleNewProject()}>new project</Button>
    </div>
  )
}

export default NewProjectButton