import React from 'react'

export default function ScoreBanner(props) {
  return (
    <div>
      <p>
        {props.title}: <span>"{props.name}" with {props.value} tasks completed!</span>
      </p>
    </div>
  )
}
