import React from 'react'

const SuccessMessage = ({message,show}) => {
  return (
    <div className="sent-message" style={{display: show ? "block" : "none"}}>{message}</div>
  )
}

export default SuccessMessage