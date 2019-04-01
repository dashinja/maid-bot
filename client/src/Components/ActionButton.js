import React from "react"

function ActionButton(props) {
  return (
    <>
      <button 
        type="button" 
        name={props.name}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.text}
      </button>
    </>
  )
}

export default ActionButton;