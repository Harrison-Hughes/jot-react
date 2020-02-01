import React, { useState } from "react";
import API from "../../../../adapters/API";
import FadeInDiv from "../../../../elements/FadeInDiv";

const NewDocumentForm = props => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "pad"
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
    if (formData.type === "pad") {
      API.newPad(
        formData.name,
        formData.description,
        props.projectId
      ).then(() => props.refetch());
      setFormData({ name: "", description: "", type: "pad" });
    }
  };

  return (
    <FadeInDiv
      className={props.newDocumentForm ? "fade-in-div on" : "fade-in-div off"}
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
          value="Create document"
        />
      </form>
    </FadeInDiv>
  );
};

export default NewDocumentForm;
