import React from "react";

import "./Button.css";

const Button = ({ children, positive, negative, thin, ...props }) => (
  <button
    style={{ padding: `${thin ? `2px 4px` : `10px 20px`}` }}
    className={
      "button" +
      `${negative ? ` negative` : ``}` +
      `${positive ? ` positive` : ``}`
    }
    {...props}
  >
    {children}
  </button>
);

export default Button;
