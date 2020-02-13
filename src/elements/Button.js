import React from "react";

import "./Button.css";

const Button = ({ children, lb, positive, negative, thin, ...props }) => (
  <button
    style={{ padding: `${thin ? `2px 4px` : `10px 20px`}` }}
    className={
      "button" +
      `${negative ? ` negative` : ``}` +
      `${positive ? ` positive` : ``}` +
      `${lb ? ` lb` : ``}`
    }
    {...props}
  >
    {children}
  </button>
);

export default Button;
