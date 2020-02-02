import React from 'react'

import './FadeInDiv.css'

const FadeInDiv = ({ children, ...props }) => (
  <div
    className="fade-in-div"
    {...props}
  >
    {children}
  </div>
)

export default FadeInDiv
