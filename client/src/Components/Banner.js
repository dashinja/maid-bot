import React from 'react'

export default function Banner(props) {
  return (
    <div>
      <p>{props.title}</p>   
      <p>{props.value}</p>
    </div>
  )
}
