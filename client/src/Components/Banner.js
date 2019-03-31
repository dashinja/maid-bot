import React from 'react'

export default function Banner(props) {
  return (
    <div>
      <p>
        {props.title}: <span>{props.value}</span>
      </p>
    </div>
  )
}
