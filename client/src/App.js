import React, { Component } from 'react'
import './App.css'
import ActionButton from './Components/ActionButton'
import axios from 'axios'
import { Destroyer, selectChores } from './bots'
import { Task, Pattern } from './patterns'

const createdBots = JSON.parse(localStorage.getItem('createdBots')) || []
console.log("createdBots value on page load:", createdBots)

class App extends Component {
  state = {
    botName: '',
    botType: 'Bipedal',
  }

  doAction = e => {
    console.log('e.target.name:', e.target.name)
    const name = e.target.name
    let data = {
      name,
    }
    // axios.post('/api/action', data)
  }

  doChores = e => {
    e.preventDefault()
    console.log('Front Action')
    console.log('Available Task Lists:', Task)
    const testerBotomat = new Destroyer('Dashinja-Ninja', 'Quadrupedal')

    selectChores(Task.insideTasks, Task.outsideTasks, testerBotomat)
  }

  alphaPattern = e => {
    e.preventDefault()
    console.log('Alpha Pattern')
  }

  createBot = e => {
    console.log(
      `A name was submitted: ${this.state.botName} \n${
        this.state.botName
      } is a ${this.state.botType}`,
    )
    e.preventDefault()

    let data = {
      name: this.state.botName,
      botType: this.state.botType,
    }

    createdBots.push(new Destroyer(this.state.botName, this.state.botType))
    console.log("createdBots:", createdBots)
    localStorage.setItem('createdBots', JSON.stringify(createdBots))
    // axios.post('/api/bot', data).then(() => {
    //   this.setState({
    //     botName: '',
    //     botType: '',
    //   })
    // })
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.type === 'select' ? target.selected : target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <>
        <h1>Hi, check the form below:</h1>
        <form onSubmit={this.createBot}>
          <fieldset>
            <legend>Create a Bot</legend>
            <label>
              Bot Name:
              <input
                name="botName"
                type="text"
                value={this.state.botName}
                onChange={this.handleInputChange}
              />
            </label>

            <select
              name="botType"
              type="select"
              id="botType"
              selected={this.state.botType}
              onChange={this.handleInputChange}
              value={this.state.botType}
            >
              <option value="Unipedal">Unipedal</option>
              <option value="Bipedal">Bipedal</option>
              <option value="Quadrupedal">Quadrupedal</option>
              <option value="Arachnid">Arachnid</option>
              <option value="Radial">Radial</option>
              <option value="Aeronautical">Aeronautical</option>
            </select>

            <input type="submit" value="Submit" />
          </fieldset>
        </form>

        <ActionButton
          text="Wash Dishes"
          name="doTheDishes"
          onClick={this.doAction}
        />
        <ActionButton
          text="Attack"
          name="attackValue"
          onClick={this.doAction}
        />
        <ActionButton text="Front Version" name="N/A" onClick={this.doChores} />
      </>
    )
  }
}

export default App
