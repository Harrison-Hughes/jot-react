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

  console.log(`${props.user.user_code}`);

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
    <FadeInDiv
      className={props.newPointForm ? "fade-in-div on" : "fade-in-div off"}
    >
      <form onSubmit={handleSubmit}>
        <textarea
          onChange={handleTextChange}
          type="text"
          name="text"
          placeholder="text"
          value={formData.text}
        />
        <br />
        <input
          disabled={formData.text === ""}
          type="submit"
          value="Add point"
        />
      </form>
    </FadeInDiv>
  );
};

export default NewPointForm;
