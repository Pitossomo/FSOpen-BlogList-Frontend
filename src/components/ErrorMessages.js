import React from "react"

const ErrorMessages = ({errorMessages}) => (
  <div>
    { errorMessages.map((msg, i) => (
      <p key={`msg ${i}`} >{msg}</p>
    ))}
  </div>
)

export default ErrorMessages