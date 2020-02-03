import React, { useState } from "react";
import API from "../../../../adapters/API";
import FadeInDiv from "../../../../elements/FadeInDiv";
import "./NewDocumentForm.css";

const NewDocumentForm = props => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "pad"
  });

  const handleNameChange = e => {
    if (formData.name.length <= 15) {
      setFormData({
        ...formData,
        name: e.target.value
      });
    }
  };

  const handleDescChange = e => {
    if (
      formData.description.length <= 80 &&
      formData.description.split(" ").lastIndexOf.length <= 20 &&
      e.target.keyCode !== 8
    ) {
      setFormData({
        ...formData,
        description: e.target.value
      });
    }
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
    props.toggleNewDoc();
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
          placeholder="name (max 15 chars.)"
          value={formData.name}
        />
        <br />
        <textarea
          onChange={handleDescChange}
          name="description"
          placeholder="description (max 80 chars.)"
          value={formData.description}
        />
        <br />
        <input
          disabled={
            formData.name === "" ||
            formData.description === "" ||
            anyWordsInStringTooLong(formData.description)
          }
          type="submit"
          value="Create document"
        />
      </form>
    </FadeInDiv>
  );
};

const anyWordsInStringTooLong = string => {
  let arr = string.split(" ");
  let longestLength = arr.sort(function(a, b) {
    return b.length - a.length;
  })[0].length;
  return longestLength >= 15 ? true : false;
};

export default NewDocumentForm;
