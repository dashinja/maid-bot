import React, { Component } from 'react'
import './App.css'
import ActionButton from './Components/ActionButton'
import axios from 'axios'
import { Destroyer, selectChores, executioner } from './bots'
import { Task, Pattern } from './patterns'
import Banner from './Components/Banner'

// let createdBots = [new Destroyer('The Original Destroyer', 'Bipedal')]

let createdBots = JSON.parse(localStorage.getItem('createdBots')) || [
  new Destroyer('The Original Destroyer', 'Bipedal'),
]

console.log('createdBots value on page load:', createdBots)

class App extends Component {
  state = {
    botName: '',
    botType: 'Bipedal',
    workDone: 0,
    currentTask: '',
    nextTask: '',
    choreList: '',
  }

  createBot = e => {
    e.preventDefault()

   if (this.state.botName === "") {
     return console.error("Must enter a Robot Name!")
   } 

    console.log(
      `A name was submitted: ${this.state.botName} \n${
        this.state.botName
      } is a ${this.state.botType}`,
    )

    this.setState(prevState => ({
      workDone: prevState.workDone * 0,
    }))

    let data = {
      name: this.state.botName,
      botType: this.state.botType,
      workDone: this.state.workDone,
    }

    createdBots.push(new Destroyer(this.state.botName, this.state.botType))
    console.log('createdBots:', createdBots)
    
    axios.post('/api/bot', data)
    .then((happy) => {
      console.log('post complete, using:', data)
      console.log("what's happy?:", happy)
      this.setState({
        botName: '',
        botType: 'Bipedal',
      })
    })
    .catch(err => console.log(err))

    localStorage.setItem('createdBots', JSON.stringify(createdBots))
  }

  doSingleAction = e => {
    e.preventDefault()
    console.log('e.target.name:', e.target.name)
    const name = e.target.name
    // let data = {
    //   name,
    // }

    this.executioner([name], createdBots[createdBots.length - 1])

    // Reflects 1 task added for current bot
    this.setState(prevState => ({
      workDone: prevState.workDone + 1,
    }))
    // axios.post('/api/action', data)
  }

  doChores = e => {
    e.preventDefault()
    console.log('Available Task Lists:', Task)

    // Reflects 5 tasks added for current bot
    this.setState(prevState => ({
      workDone: prevState.workDone + 5,
    }))

    // Select and Do chores on the most recently created Bot
    this.selectChores(
      Task.insideTasks,
      Task.outsideTasks,
      createdBots[createdBots.length - 1],
    )
  }

  drillPractice = e => {
    e.preventDefault()
    console.log(Pattern)
    console.log('Random Drill Pattern')
    const drills = Object.entries(Pattern)
    console.log('drills:', drills)

    const randChoice = Math.floor(Math.random() * Pattern.length)
    const choice = Pattern[randChoice]
    console.log('choice:', choice)

    // createdBots[createdBots.length - 1].executioner(choice, createdBots[createdBots.length - 1])

    this.executioner(choice, createdBots[createdBots.length - 1])
    this.setState(prevState => ({
      workDone: prevState.workDone + 5,
    }))
  }

  // Make sure pass an array, even if an array of one element
  executioner(array, bot) {
    if (array[0] && bot[array[0]]) {
      this.setState({ nextTask: array.length })
      console.log('\n', bot[array[0]]().description)
      this.setState({ currentTask: bot[array[0]]().description })
      setTimeout(() => {
        console.log(`\n${bot.name} Finished the Task`)
        let nextArray = array.slice(1)
        console.log('Remaining Tasks:', nextArray)
        this.setState({ nextTask: nextArray.length })
        this.executioner(nextArray, bot)
      }, bot[array[0]]().eta)
    } else console.log('All Tasks Complete!')
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.type === 'select' ? target.selected : target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
  }

  selectChores(first, second, bot) {
    const randChoice = () => Math.random()
    randChoice() > 0.2
      ? this.executioner(first, bot) &&
        this.setState({ choreList: 'Indoor Chores' })
      : this.executioner(second, bot) &&
        this.setState({ choreList: 'Outdoor Chores' })
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
          onClick={this.doSingleAction}
        />
        <ActionButton
          text="Attack"
          name="attackValue"
          onClick={this.doSingleAction}
        />
        <ActionButton text="Front Version" name="N/A" onClick={this.doChores} />
        <ActionButton
          text="HD Drill Practice"
          name="N/A"
          onClick={this.drillPractice}
        />
        <Banner title="Work Done" value={this.state.workDone} />
        <Banner title="Current Task" value={this.state.currentTask} />
        <Banner title="Tasks Remaining" value={this.state.nextTask} />
      </>
    )
  }
}

export default App
