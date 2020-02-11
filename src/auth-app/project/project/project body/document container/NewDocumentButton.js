import React, { useState, useEffect } from "react";
import Button from "../../../../../elements/Button";

const NewDocumentButton = props => {
  return (
    <div className="new document">
      <Button thin onClick={() => props.toggleNewDoc()}>
        {props.on ? "cancel new document" : "new document"}
      </Button>
    </div>
  );
};

export default NewDocumentButton;
