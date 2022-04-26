import React from 'react'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'

export default function CreateForm(props) {
  return (
    <div>
      <Grid container justify="center">
        <h1>Maid-Bot Home Defense Systems</h1>
      </Grid>
      <Grid container justify="center">
        <h3>Give your bot a name and choose it's type</h3>
      </Grid>
      <Grid container justify="center">
        <h4>How much work can YOUR bot do?</h4>
      </Grid>

      <Grid container justify="center">
        <form onSubmit={props.onSubmit}>
          <fieldset>
            <legend>Create a Bot</legend>
            <label>
              <span>Name: </span>
              <Input
                name="botName"
                type="text"
                onChange={props.handleInputChange}
                placeholder="Enter Bot Name Here"
                classes={{ input: 'white-text' }}
              />
              <span> Type: </span>
            </label>

            <Select
              name="botType"
              type="select"
              id="botType"
              selected={props.botType}
              onChange={props.handleInputChange}
              value={props.botType}
              native={true}
              variant="filled"
              classes={{ filled: 'white-text' }}
            >
              <option value="Unipedal">Unipedal</option>
              <option value="Bipedal">Bipedal</option>
              <option value="Quadrupedal">Quadrupedal</option>
              <option value="Arachnid">Arachnid</option>
              <option value="Radial">Radial</option>
              <option value="Aeronautical">Aeronautical</option>
            </Select>

            <Button type="submit" variant="contained" size="large">
              Submit
            </Button>
          </fieldset>
        </form>
      </Grid>
    </div>
  )
}
