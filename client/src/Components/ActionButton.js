import React from 'react'
import Button from '@material-ui/core/Button'
function ActionButton(props) {
  return (
    <>
      <Button
        type="button"
        name={props.name}
        onClick={props.onClick}
        disabled={props.disabled}
        color={props.color}
        variant="contained"
        size={props.size}
      >
        {props.text}
      </Button>
    </>
  )
}

export default ActionButton
