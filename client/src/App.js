import React, { Component } from 'react'
import './App.css'
import ActionButton from './Components/ActionButton'
import axios from 'axios'
import { Destroyer, selectChores, executioner } from './bots'
import { Task, Pattern } from './patterns'
import Banner from './Components/Banner'

let createdBots = []
// let createdBots = [new Destroyer('The Original Destroyer', 'Bipedal')]

// let createdBots = JSON.parse(localStorage.getItem('createdBots')) || [
//   new Destroyer('The Original Destroyer', 'Bipedal'),
// ]

console.log('createdBots value on page load:', [createdBots])

class App extends Component {
  state = {
    botName: '',
    botType: 'Bipedal',
    workDone: 0,
    currentTask: '',
    nextTask: '',
    choreList: '',
    isDisabled: true,
  }

  componentDidMount() {
    this.getScores()
  }

  createBot = e => {
    e.preventDefault()

    if (this.state.botName === '') {
      return console.error('Must enter a Robot Name!')
    }

    console.log(
      `A name was submitted: ${this.state.botName} \n${
        this.state.botName
      } is a ${this.state.botType}`,
    )

    this.setState(prevState => ({
      workDone: prevState.workDone + 5,
    }))

    createdBots.push(new Destroyer(this.state.botName, this.state.botType))
    console.log('createdBots:', createdBots)

    this.executioner(Task.insideTasks, createdBots[createdBots.length - 1])

    let creationData = {
      name: this.state.botName,
      botType: this.state.botType,
      workDone: 5,
      attack: createdBots[createdBots.length - 1].attackValue().attack,
      defense: createdBots[createdBots.length - 1].defenseValue().defense,
      speed: createdBots[createdBots.length - 1].speedValue().speed,
    }
    console.log('data:', creationData)

    axios
      .post('/api/bot', creationData)
      .then(happy => {
        console.log('post complete, using:', creationData)
        console.log("what's happy?:", happy)
        this.setState({
          botName: '',
          botType: 'Bipedal',
        })
      })
      .catch(err => console.log(err))

    this.setState({ isDisabled: false })

    // localStorage.setItem('createdBots', JSON.stringify(createdBots))
  }

  doSingleAction = e => {
    e.preventDefault()
    console.log('e.target.name:', e.target.name)
    const name = e.target.name

    // Reflects 1 task added for current bot
    this.setState(prevState => ({
      workDone: prevState.workDone + 1,
      name: createdBots[createdBots.length - 1].name,
    }))

    let data = {
      name,
      workDone: this.state.workDone,
      botName: createdBots[createdBots.length - 1].name,
    }
    this.executioner([name], [createdBots][[createdBots].length - 1])

    console.log('data before axios:', data)

    axios
      .post('/api/bot/score', data)
      .then(returnData => {
        console.log('Successful PUT update. New values', returnData)
      })
      .catch(err => console.log(err))

    this.getScores()
  }

  doChores = e => {
    e.preventDefault()
    console.log('Available Task Lists:', Task)

    // Reflects 5 tasks added for current bot
    this.setState(
      prevState => (
        {
          workDone: prevState.workDone + 5,
        },
        this.updateWorkState()
      ),
    )

    // Select and Do chores on the most recently created Bot
    this.selectChores(
      Task.insideTasks,
      Task.outsideTasks,
      createdBots[createdBots.length - 1],
    )

    this.getScores()
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

    this.updateWorkState()
    this.getScores()
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

  getScores() {
    axios.get('/api/bot/score').then(allScores => {
      console.log('allscores', allScores.data)
      // allScores.data.map(score => console.log(score))
    })
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

  updateWorkState = () => {
    let data = {
      workDone: this.state.workDone,
      botName: createdBots[createdBots.length - 1].name,
    }

    return axios
      .post('/api/bot/score', data)
      .then(returnData => {
        console.log(
          `Successful PUT update. Used: ${JSON.stringify(
            data,
          )}. New values: ${returnData}`,
        )
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <>
        <h1>Welcome to Maid-Bot Wars</h1>
        <h3>Give your bot a name and choose it's type</h3>
        <h4>How much work can YOUR bot do?</h4>

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
          disabled={this.state.isDisabled}
        />
        <ActionButton
          text="Attack"
          name="attackValue"
          onClick={this.doSingleAction}
          disabled={this.state.isDisabled}
        />
        <ActionButton
          text="Do Chores"
          name="N/A"
          onClick={this.doChores}
          disabled={this.state.isDisabled}
        />
        <ActionButton
          text="HD Drill Practice"
          name="N/A"
          onClick={this.drillPractice}
          disabled={this.state.isDisabled}
        />
        <ActionButton
          text="Refresh Score"
          name="N/A"
          onClick={this.getScores}
          clickable={true}
        />
        <Banner title="Work Done" value={this.state.workDone} />
        <Banner title="Current Task" value={this.state.currentTask} />
        <Banner title="Tasks Remaining" value={this.state.nextTask} />
      </>
    )
  }
}

export default App
