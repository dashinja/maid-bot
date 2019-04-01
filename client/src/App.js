import React, { Component } from 'react'
import './App.css'
import ActionButton from './Components/ActionButton'
import axios from 'axios'
import { Destroyer, selectChores, executioner } from './bots'
import { Task, Pattern } from './patterns'
import Banner from './Components/Banner'
import ScoreBanner from './Components/ScoreBanner'

let createdBots = []
console.log('createdBots value on page load:', [createdBots])

class App extends Component {
  state = {
    botName: '',
    botType: 'Bipedal',
    workDone: 0,
    currentTask: 'Awaiting Bot Creation',
    nextTask: 0,
    choreList: '',
    isDisabled: true,
    score: 'high score',
  }

  componentDidMount() {
    this.getScores()
  }

  createBot = e => {
    e.preventDefault()

    if (this.state.botName === '') {
      return console.error('Must enter a Robot Name!')
    }

    this.setState(prevState => ({
      workDone: prevState.workDone + 5,
    }))

    createdBots.push(new Destroyer(this.state.botName, this.state.botType))

    this.executioner(Task.insideTasks, createdBots[createdBots.length - 1])

    let creationData = {
      name: this.state.botName,
      botType: this.state.botType,
      workDone: 5,
      attack: createdBots[createdBots.length - 1].attackValue().attack,
      defense: createdBots[createdBots.length - 1].defenseValue().defense,
      speed: createdBots[createdBots.length - 1].speedValue().speed,
    }

    axios
      .post('/api/bot', creationData)
      .then(data => {
        this.setState({
          botName: '',
          botType: 'Bipedal',
        })
      })
      .catch(err => console.log(err))

    this.setState({ isDisabled: false })
  }

  doSingleAction = e => {
    e.preventDefault()
    const name = e.target.name
    console.log("name:", name)
    // Reflects 1 task added for current bot
    this.setState(prevState => ({
      workDone: prevState.workDone + 1,
      name: createdBots[createdBots.length - 1].name,
    }))
    const tasks = []
    tasks.push(e.target.name)
    console.log("tasks", tasks)
    let data = {
      name,
      workDone: this.state.workDone,
      botName: createdBots[createdBots.length - 1].name,
    }
    this.executioner(tasks, [createdBots][[createdBots].length - 1])


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

    this.updateWorkState()
    this.getScores()
  }

  drillPractice = e => {
    e.preventDefault()
    // console.log(Pattern)
    // console.log('Random Drill Pattern')
    // const drills = Object.entries(Pattern)
    // console.log('drills:', drills)

    const randChoice = Math.floor(Math.random() * Pattern.length)
    const choice = Pattern[randChoice]
    // console.log('choice:', choice)

    this.executioner(choice, createdBots[createdBots.length - 1])

    // Reflects 5 tasks added for current bot
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
    } else {
      console.log('All Tasks Complete!')
      this.setState({currentTask: "All Tasks Complete!"})
    }
  }

  getScores() {
    axios
      .get('/api/bot/score')
      .then(allScores => {
        console.log('allscores', allScores.data)
        this.setState({ score: allScores.data })
        console.log('typeof:', Array.isArray(allScores.data))
        this.scores = allScores.data
      })
      .catch(err => console.log(err))
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
          `Successful PO update. Used: ${JSON.stringify(
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
          text="Do Chore Regimen"
          name="N/A"
          onClick={this.doChores}
          disabled={this.state.isDisabled}
        />
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
        <Banner title="Current Task" value={this.state.currentTask} />
        <Banner title="Tasks Remaining" value={this.state.nextTask} />
        <Banner title="Work Done" value={this.state.workDone} />
        <br />
        <ScoreBanner
          title="High Score"
          value={this.state.score[0].workDone}
          name={this.state.score[0].name}
        />
      </>
    )
  }
}

export default App
