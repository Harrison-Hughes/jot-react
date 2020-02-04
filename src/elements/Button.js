import React from "react";

import "./Button.css";

const Button = ({ children, thin, ...props }) => (
  <button
    style={{
      padding: `${thin ? `2px 4px` : `10px 20px`}`
      // border: `solid 1px ${primary ? "red" : ""}`
    }}
    className="button"
    {...props}
  >
    {children}
  </button>
);

export default Button;
