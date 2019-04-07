import React from 'react'

export default function Banner(props) {
  return (
    <div>
      <p>
        <strong>{props.title}:</strong> <span>{props.value}</span>
      </p>
    </div>
  )
}
