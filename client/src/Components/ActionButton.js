import React from "react"

function ActionButton(props) {
  return (
    <>
      <input 
        type="button" 
        value={props.text}
        name={props.name}
        onClick={props.onClick}
        disabled={props.disabled}
      />
    </>
  )
}

export default ActionButton;