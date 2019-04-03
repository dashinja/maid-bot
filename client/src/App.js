import React, { Component } from 'react'
import './App.css'
import ActionButton from './Components/ActionButton'
import axios from 'axios'
import { Destroyer } from './bots'
import { Task, Pattern } from './patterns'
import Banner from './Components/Banner'
import ScoreBanner from './Components/ScoreBanner'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import TaskBanner from './Components/TaskBanner'
import Burglar from './burglar'
import SimpleModal from './Components/SimpleModal'

let createdBots = []
console.log('createdBots value on page load:', [createdBots])

class App extends Component {
  state = {
    botName: '',
    botType: 'Bipedal',
    workDone: 0,
    totalWorkDone: 0,
    currentTask: 'Awaiting Bot Creation',
    nextTask: 0,
    choreList: '',
    isDisabled: true,
    score: 'high score',
    progressInterval: 0,
    semiPermaName: 'Bot',
    winner: '',
  }

  //Counts submissions with no Input Name
  noNameCount = 0
  
  //Robot Commentary Setup
  speak = {
  and: function (text) {
    window.responsiveVoice.speak(text, 'UK English Female', {
      pitch: 0.77,
      volume: 1,
    })
  }}

  componentDidMount() {
    this.getScores()
  }

  createBot = e => {
    e.preventDefault()
    let speak = {
      and: function(text) {
        window.responsiveVoice.speak(text, 'UK English Female', {
          pitch: 0.77,
          volume: 1,
        })
      },
    }

    if (this.state.botName === '') {
      if (this.noNameCount === 0) {
        speak.and(
          'Nope! You must enter a proper Robot Name for your little pet',
        )
        this.noNameCount += 1
        console.log("I'm this.noNameCount:", this.noNameCount)
        return console.error('Must enter a Robot Name!')

      } else if (this.noNameCount === 1) {
        this.noNameCount += 1
        speak.and('Gaaaahh, reallY!?!?! Instructions, people! Kids these days!')
        console.log("I'm this.noNameCount:", this.noNameCount)
        return console.error('Must enter a Robot Name!')

      } else if (this.noNameCount === 2) {
        this.noNameCount += 1
        speak.and("BLAST! I... i'm just...I'm just so finished talking with you!")
        console.log("I'm this.noNameCount:", this.noNameCount)
        return console.error('Must enter a Robot Name!')

      } else if (this.noNameCount >= 3) {
        speak.and("shhh! Whatever! See if I care.")
      }
    } else {
      console.log("I'm this.noNameCount:", this.noNameCount)
      if (this.noNameCount >= 1 && this.noNameCount <= 3) {
        speak.and(`There, that's better. So ...Um...`)
        speak.and(`${this.state.botName} you call it?`)
        speak.and(`How very nice.`)
        speak.and(`Now its doing your chores for you automagically`)
        this.noNameCount += 10
        console.log("I'm this.noNameCount:", this.noNameCount)
        setTimeout(() => {
          speak.and(`How Simply amazing!`)
        }, 10500);

      } else if (this.noNameCount <1) {
        speak.and(`Well well then. ${this.state.botName}, ahah? - I see... - How unique of you`)
        speak.and(`Now its doing your chores for you`)
        this.noNameCount += 10
        console.log("I'm this.noNameCount:", this.noNameCount)
        setTimeout(() => {
          speak.and(`Just look at it go!`)
        }, 10500);
      } else {
        return
      }
        this.setState(
          prevState => (
            {
              workDone: prevState.workDone + 5,
              semiPermaName: this.state.botName,
              // eslint-disable-next-line
            },
            botStartUp()
          ),
        )

        const botStartUp = () => {
          console.log(
            'workDone before creation of new Bot:',
            this.state.workDone,
          )

          createdBots.push(
            new Destroyer(this.state.botName, this.state.botType),
          )

          this.executioner(
            Task.insideTasks,
            createdBots[createdBots.length - 1],
          )

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
              this.getScores()
            })
            .catch(err => console.log(err))

          this.setState({ isDisabled: false })
        }
    }
  }

  // doSingleAction = e => {
  //   e.preventDefault()
  //   const name = e.target.name
  //   console.log('name:', name)
  //   // Reflects 1 task added for current bot
  //   this.setState(prevState => ({
  //     workDone: prevState.workDone + 1,
  //     name: createdBots[createdBots.length - 1].name,
  //   }))
  //   const tasks = []
  //   tasks.push(e.target.name)
  //   console.log('tasks', tasks)
  //   let data = {
  //     name,
  //     workDone: this.state.workDone,
  //     botName: createdBots[createdBots.length - 1].name,
  //   }
  //   this.executioner(tasks, [createdBots][[createdBots].length - 1])

  //   axios
  //     .post('/api/bot/score', data)
  //     .then(returnData => {
  //       console.log('Successful PUT update. New values', returnData)
  //     })
  //     .catch(err => console.log(err))

  //   this.getScores()
  // }

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

    const randChoice = Math.floor(Math.random() * Pattern.length)
    const choice = Pattern[randChoice]

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
        // this.setState({ nextTask: nextArray.length })
        this.getScores()
        this.setState(prevState => ({
          nextTask: nextArray.length,
          progressInterval: prevState.progressInterval + 1,
        }))
        this.executioner(nextArray, bot)
      }, bot[array[0]]().eta)
    } else {
      console.log(`${bot.name} completed all tasks!`)
      this.setState({
        currentTask: `${bot.name} completed all tasks!`,
        totalWorkDone: this.state.workDone,
        workDone: 0,
      }, () => window.responsiveVoice.speak("All Done! And ready for second breakfast! Eleven seas and more!", "UK English Female"))
    }
  }

  getScores() {
    // Retrieves highest score only
    axios
      .get('/api/bot/score')
      .then(allScores => {
        allScores.data === 'N/A'
          ? this.setState({
              score: allScores.data,
            })
          : this.setState({
              score: allScores.data[0],
            })
        // console.log('allscores', allScores.data[0])

        // this.setState({ score: allScores.data[0] })
        // console.log('typeof:', Array.isArray(allScores.data))
        // console.log('this.state.score:', this.state.score)
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

  homeDefense = () => {
    console.log('Home defense activated!')
    const intruder = new Burglar()

    this.setState(
      { winner: intruder.attackValue(createdBots[createdBots.length - 1]) },
      () => {
        console.log('new winner:', this.state.winner)
      },
    )

    // createdBots[createdBots.length - 1].health > 0 ||
    // intruder.health >= 9000
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
          `Successful POST update. Used: ${JSON.stringify(
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
              <span>Name: </span>
              <Input
                name="botName"
                type="text"
                value={this.state.botName}
                onChange={this.handleInputChange}
                placeholder="Enter Bot Name Here"
              />
              <span> Type: </span>
            </label>

            <Select
              name="botType"
              type="select"
              id="botType"
              selected={this.state.botType}
              onChange={this.handleInputChange}
              value={this.state.botType}
              native={true}
              variant="filled"
            >
              <option value="Unipedal">Unipedal</option>
              <option value="Bipedal">Bipedal</option>
              <option value="Quadrupedal">Quadrupedal</option>
              <option value="Arachnid">Arachnid</option>
              <option value="Radial">Radial</option>
              <option value="Aeronautical">Aeronautical</option>
            </Select>

            {/* <Input 
              type="submit" 
              value="Submit" 
              variant="contained"
            /> */}
            <Button type="submit" variant="contained" size="large">
              Submit
            </Button>
          </fieldset>
        </form>

        <ActionButton
          text="Do Chore Regimen"
          name="N/A"
          onClick={this.doChores}
          disabled={this.state.isDisabled}
          color="secondary"
          size="large"
        />

        <ActionButton
          text="Home Defense Drill Practice"
          name="N/A"
          onClick={this.drillPractice}
          disabled={this.state.isDisabled}
          color="primary"
          size="large"
        />

        <ActionButton
          text="Burglar Attack"
          name="N/A"
          onClick={this.homeDefense}
          disabled={this.state.isDisabled}
          color="secondary"
          size="large"
        />
        {/* <ActionButton
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
        /> */}
        {/* <ActionButton
          text="Refresh Score"
          name="N/A"
          onClick={this.getScores}
          color="primary"
          size="large"
        /> */}

        <Banner title="Status" value={this.state.currentTask} />
        <TaskBanner
          title={`Tasks Remaining for ${this.state.semiPermaName}`}
          value={this.state.nextTask}
        />
        <Banner title="Work Done" value={this.state.progressInterval} />
        <br />
        <ScoreBanner
          title="High Score"
          value={this.state.score === 'N/A' ? 'any' : this.state.score.workDone}
          name={this.state.score === 'N/A' ? `No-Bot-y` : this.state.score.name}
        />

        <Banner title="Burglar Status" value="Unknown" />
        <SimpleModal />
      </>
    )
  }
}

export default App
