import React from 'react'

export default function ScoreBanner(props) {
  return (
    <div>
      <p>
        {props.title}:{' '}
        <span>
          <strong>{props.name}</strong> with {props.value} tasks completed!
        </span>
      </p>
    </div>
  )
}
