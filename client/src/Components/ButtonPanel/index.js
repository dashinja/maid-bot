import React from 'react'
import ActionButton from './ActionButton'
import Grid from '@material-ui/core/Grid'

export default function ButtonPanel(props) {
  return (
    <Grid container justify="center">
      <ActionButton
        text="Do Chore Regimen"
        name="N/A"
        onClick={props.doChores}
        disabled={props.isDisabledChore}
        color="secondary"
        size="large"
        classes={{ disabled: 'light-grey' }}
        variant="contained"
      />

      <ActionButton
        text="Home Defense Drill Practice"
        name="N/A"
        onClick={props.drillPractice}
        disabled={props.isDisabledDrill}
        color="primary"
        size="large"
      />

      <ActionButton
        text="Burglar Attack"
        name="N/A"
        onClick={props.burglarDefense}
        disabled={props.isDisabledBurglar}
        color="secondary"
        size="large"
      />
    </Grid>
  )
}
