import React, { useState, useEffect } from "react";
import Button from "../../../../../elements/Button";

const NewDocumentButton = props => {
  return (
    <div className="new document">
      <Button onClick={() => props.toggleNewDoc()}>new document</Button>
    </div>
  );
};

export default NewDocumentButton;
