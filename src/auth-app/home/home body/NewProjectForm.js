import React, { useState } from "react";
import API from "../../../adapters/API";
import FadeInDiv from "../../../elements/FadeInDiv";

const NewProjectForm = props => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    open: true
  });

  const handleNameChange = e => {
    setFormData({
      ...formData,
      name: e.target.value
    });
  };

  const handleDescChange = e => {
    setFormData({
      ...formData,
      description: e.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    API.newProject(
      formData.name,
      formData.description,
      formData.open
    ).then(() => props.refetch());
    setFormData({ name: "", description: "", open: true });
  };

  return (
    <FadeInDiv
      className={props.newProjectForm ? "fade-in-div on" : "fade-in-div off"}
    >
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleNameChange}
          type="name"
          name="name"
          placeholder="name"
          value={formData.name}
        />
        <br />
        <textarea
          onChange={handleDescChange}
          name="description"
          placeholder="description"
          value={formData.description}
        />
        <br />
        <input
          disabled={formData.name === "" || formData.description === ""}
          type="submit"
          value="Create project"
        />
      </form>
    </FadeInDiv>
  );
};

export default NewProjectForm;
