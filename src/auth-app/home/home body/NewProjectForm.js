import React, { useState, useEffect } from "react";
import API from "../../../adapters/API";
import FadeInDiv from "../../../elements/FadeInDiv";
import "./NewProjectForm.css";

const NewProjectForm = props => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    open: true,
    defaultAccess: "admin"
  });

  useEffect(
    () =>
      setFormData({
        name: "",
        description: "",
        open: true,
        defaultAccess: "admin"
      }),
    [props]
  );

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
    API.newProject(
      props.user.user_code,
      formData.name,
      formData.description,
      formData.open,
      formData.defaultAccess
    ).then(() => props.refetch());
    setFormData({ name: "", description: "", open: true });
    props.toggleNewProject();
  };

  return (
    <FadeInDiv
      className={props.newProjectForm ? "fade-in-div on" : "fade-in-div off"}
    >
      <div className="form-style-5">
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>project name:</label>
            <input
              onChange={handleNameChange}
              type="name"
              name="name"
              placeholder="name (max 15 chars.)"
              value={formData.name}
            />
          </div>
          <div className="form-field">
            <label>project description:</label>
            <textarea
              onChange={handleDescChange}
              name="description"
              placeholder="description (max 80 chars.)"
              value={formData.description}
            />
          </div>
          <div className="form-field">
            open:
            <input
              type="radio"
              value="open"
              checked={formData.open}
              onChange={() =>
                setFormData({
                  ...formData,
                  open: true
                })
              }
            />
            private:
            <input
              type="radio"
              value="private"
              checked={!formData.open}
              onChange={() =>
                setFormData({
                  ...formData,
                  open: false
                })
              }
            />
          </div>
          <div className="form-field">
            default access:
            <select
              value={formData.defaultAccess}
              onChange={e =>
                setFormData({
                  ...formData,
                  defaultAccess: e.target.value
                })
              }
            >
              <option value={"admin"}>admin</option>
              <option value={"editor"}>editor</option>
              <option value={"read only"}>read only</option>
            </select>
          </div>
          <input
            disabled={
              formData.name === "" ||
              formData.description === "" ||
              anyWordsInStringTooLong(formData.description)
            }
            type="submit"
            value="Create project"
          />
        </form>
      </div>
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

export default NewProjectForm;
