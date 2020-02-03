import React from "react";

import "./Button.css";

const Button = ({ children, primary, ...props }) => (
  <button
    style={{
      color: primary ? "red" : "",
      border: `solid 1px ${primary ? "red" : ""}`
    }}
    className="button"
    {...props}
  >
    {children}
  </button>
);

export default Button;
