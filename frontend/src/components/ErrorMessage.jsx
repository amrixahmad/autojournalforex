import React from 'react'

const ErrorMessage = ({message,show}) => {
  return (
    <div className="error-message" style={{display: show ? "block" : "none"}}>{message}</div>
  )
}

export default ErrorMessage