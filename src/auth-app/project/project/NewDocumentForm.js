import React, { useState } from "react";
import API from "../../../adapters/API";
import FadeInDiv from "../../../elements/FadeInDiv";
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
    <div className="new-project-form">
      <FadeInDiv
        className={
          props.showNewDocumentForm ? "fade-in-div on" : "fade-in-div off"
        }
      >
        <div className="document-form-style-5">
          <form onSubmit={handleSubmit}>
            <div className="document-form-field">
              <label>document name:</label>
              <input
                onChange={handleNameChange}
                type="name"
                name="name"
                placeholder="name (max 15 chars.)"
                value={formData.name}
              />
            </div>
            <div className="document-form-field">
              <label>document description:</label>
              <textarea
                onChange={handleDescChange}
                name="description"
                placeholder="description (max 80 chars.)"
                value={formData.description}
              />
            </div>

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
          <button onClick={() => props.quitForm()}>cancel</button>
        </div>
      </FadeInDiv>
    </div>
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
