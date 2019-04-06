import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'

function rand() {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
  const top = 50 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
})

class SimpleModal extends React.Component {
  state = {
    open: false,
  }

  handleOpen = () => {
    this.setState({ open: true })
    let speak = {
      and: function(text) {
        window.responsiveVoice.speak(text, 'UK English Female', { pitch: 1 })
      },
    }

    speak.and('Thanks for reading Maid-Bot Instructions')
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <Typography gutterBottom>Maid-Bot Instructions</Typography>
        <Button onClick={this.handleOpen} disabled={this.state.open===true} variant="contained">Click Here</Button>
        <Modal
          aria-labelledby="Maid-Bot Instructions"
          aria-describedby="Click this button to view simple instructions for Maid-Bot usage."
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Handle With Care
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              <p>
                Enter a bot name before pressing submit. Failure to do so places
                user at risk.
              </p>
              <p>Developer not responsible for hurt feelings.</p>
            </Typography>
            <SimpleModalWrapped />
          </div>
        </Modal>
      </div>
    )
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
}

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal)

export default SimpleModalWrapped
