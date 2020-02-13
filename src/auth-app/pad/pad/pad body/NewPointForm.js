import React, { useState } from "react";
import API from "../../../../adapters/API";
import Button from "../../../../elements/Button";

const NewPointForm = props => {
  const [formData, setFormData] = useState({
    text: "",
    location: "temp",
    author: ""
  });

  const handleTextChange = e => {
    setFormData({
      ...formData,
      text: e.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    API.newPoint(
      formData.text,
      formData.location,
      `${props.nickname}`,
      props.padId
    );
    setFormData({ text: "", location: "temp", author: "" });
  };

  return (
    <div className="new-point-form">
      <div className="new-point-form-left">
        <textarea
          className="new-point-textarea-input"
          onChange={handleTextChange}
          rows="3"
          cols="30"
          name="text"
          placeholder="new point"
          value={formData.text}
        />
      </div>
      <div className="new-point-form-right">
        <Button
          lb
          thin
          disabled={formData.text === ""}
          onClick={e => handleSubmit(e)}
        >
          add point
        </Button>
      </div>
    </div>
  );
};

export default NewPointForm;
