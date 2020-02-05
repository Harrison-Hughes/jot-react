import React, { useState } from "react";
import API from "../../../../adapters/API";
import FadeInDiv from "../../../../elements/FadeInDiv";

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
      `${props.user.user_code}`,
      props.padId
    ).then(() => props.refetch());
    setFormData({ text: "", location: "temp", author: "" });
  };

  return (
    <div className="new-point-form">
      {/* <form onSubmit={handleSubmit}> */}
      <div className="new-point-form-left">
        <input
          onChange={handleTextChange}
          type="text"
          name="text"
          placeholder="text"
          value={formData.text}
        />
      </div>
      <div className="new-point-form-right">
        <button disabled={formData.text === ""} type="submit">
          Add point
        </button>
      </div>
      {/* </form> */}
    </div>
  );
};

export default NewPointForm;
