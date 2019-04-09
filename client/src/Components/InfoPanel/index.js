import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Banner from './Banner'
import ScoreBanner from './ScoreBanner'
import TaskBanner from './TaskBanner'

export default function InfoPanel(props) {
  return (
    <div>
      <Grid container justify="center" direction="row" spacing={8}>
        <Grid>
          <Banner title="Status" value={props.currentTask} />
        </Grid>
      </Grid>

      <Grid container justify="center">
        <TaskBanner
          title={`Tasks Remaining for ${props.semiPermaName}`}
          value={props.nextTask}
        />
      </Grid>

      <Grid container justify="center">
        <Banner title="Work Done" value={props.progressInterval} />
      </Grid>

      <Grid container justify="center">
        <Banner
          title="Burglar Status"
          value={
            props.winner !== undefined
              ? props.winner === 'Burglar'
                ? `Burglar is looting your owner's home over your lifeless circuits!`
                : `Burglar is defeated and has run away!`
              : `No intruders have come!`
          }
        />
      </Grid>

      <Grid container justify="center">
        <ScoreBanner
          title="High Score"
          value={
            props.score === 'N/A'
              ? 'any'
              : props.score.workDone === 0
              ? props.progressInterval
              : props.score.workDone
          }
          name={props.score === 'N/A' ? `No-Bot-y` : props.score.name}
        />
      </Grid>

      <Grid container justify="center">
        <Button
          type="submit"
          variant="contained"
          size="large"
          onClick={props.bonusSass}
        >
          Bonus Sass
        </Button>
      </Grid>
    </div>
  )
}
