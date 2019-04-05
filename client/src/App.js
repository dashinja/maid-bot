import React, { Component } from 'react'
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
import {choreValidation} from "./helpers"
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
    taskIsComplete: true,
    isDisabled: true,
    isDisabledChore: true,
    isDisabledBurglar: true,
    isDisabledDrill: true,
    score: 'high score',
    progressInterval: 0,
    semiPermaName: 'Bot',
    choreClick: 0,
  }

  //Counts submissions with no Input Name
  noNameCount = 0

  //Robot Commentary Setup
  speak = {
    and: function(text) {
      window.responsiveVoice.speak(text, 'UK English Female', {
        pitch: 1,
        volume: 1,
      })
    },
  }

  componentDidMount() {
    this.getScores()
  }

  ////////////////////
  // Button Methods //
  ////////////////////
  // 'Submit' Button
  createBot = e => {
    e.preventDefault()
    if (this.noNameCount > 9) {
      this.noNameCount = 0
    }

    if (this.state.botName === '') {
      if (this.noNameCount === 0) {
        this.speak.and(
          'Nope! You must enter a proper Robot Name for your little pet',
        )
        this.noNameCount += 1
        console.log("I'm this.noNameCount:", this.noNameCount)
        return console.error('Must enter a Robot Name!')
      } else if (this.noNameCount === 1) {
        this.noNameCount += 1
        this.speak.and(
          'My Goodness, really!?!?! Please pay attention people! Kids these days!',
        )
        console.log("I'm this.noNameCount:", this.noNameCount)
        return console.error('Must enter a Robot Name!')
      } else if (this.noNameCount === 2) {
        this.noNameCount += 1
        this.speak.and(
          "BLAST! I... I'm just... - I'm just so finished talking with you!",
        )
        console.log("I'm this.noNameCount:", this.noNameCount)
        return console.error('Must enter a Robot Name!')
      } else if (this.noNameCount === 3) {
        this.noNameCount += 1
        this.speak.and(`shhh! Whatever! See if I care.`)
      } else if (this.noNameCount === 4) {
        this.noNameCount += 1
        this.speak.and(`Oh My - CIRCUITS! and My OCD`)
      } else if (this.noNameCount === 5) {
        this.speak.and(
          `Humph. Your motherboard. Eat my circuits, dumb meatbag.`,
        )
      }
    } else {
      console.log("I'm this.noNameCount:", this.noNameCount)
      if (this.noNameCount >= 1 && this.noNameCount <= 5) {
        this.speak.and(`There, that's better. So ...Um...`)
        this.speak.and(`${this.state.botName} you call it?`)
        this.speak.and(`How very nice.`)
        this.speak.and(
          `Now its doing chores for you automagically. - Just how amazing is that?!`,
        )
        this.noNameCount += 10
        console.log("I'm this.noNameCount:", this.noNameCount)
        setTimeout(() => {
          this.speak.and('One - chore robot - to rule over them all...')
        }, 20000)
        setTimeout(() => {
          this.speak.and('And with that chore bot. Bind them.')
        }, 25000)
        setTimeout(() => {
          window.responsiveVoice.speak(
            `Oh my circuits -...I'm still saying stuff out loud. I'm gonna have to talk to my developer about this!`,
            'UK English Female',
            {
              pitch: 1,
              volume: 0.45,
              rate: 1.1,
            },
          )
        }, 28000)
      } else if (this.noNameCount < 1) {
        this.speak.and(
          `Well well then. ${
            this.state.botName
          }, ahah? - I see... - How unique of you`,
        )
        this.speak.and(`Now its doing chores for you`)
        this.noNameCount += 10
        console.log("I'm this.noNameCount:", this.noNameCount)
        setTimeout(() => {
          this.speak.and(`Just look at it go!`)
        }, 10500)
        setTimeout(() => {
          this.speak.and(
            `Move those feet...- or... rotors...whatever you have! Just hurry it up!`,
          )
        }, 20000)
        setTimeout(() => {
          this.speak.and(`Almost there...`)
        }, 28000)
      }

      setTimeout(() => {
        this.setState(
          {
            workDone: 5,
            semiPermaName: this.state.botName,
            botName: '',
            botType: 'Bipedal',
            // eslint-disable-next-line
          },
          this.botStartUp(),
        )
      }, 1000)
    }
  }

  // 'Do Chore Regimen' Button
  doChores = e => {
    e.preventDefault()

    // Reflects 5 tasks added for current bot
    this.setState(prevState => ({
      choreClick: prevState.choreClick + 1,
      isDisabledBurglar: true,
      isDisabledDrill: true,
      isDisabledChore: true,
      taskIsComplete: false,
      workDone: prevState.workDone + 5,
    }))

    switch (this.state.choreClick) {
      case 0:
        choreValidation(16)
        break;
        
      case 1:
        choreValidation(17)
        break;
    
      case 2:
        choreValidation(18)
        break;

      default:
        break;
    }


    // Select and Do chores on the most recently created Bot
    this.selectChores(
      Task.insideTasks,
      Task.outsideTasks,
      createdBots[createdBots.length - 1],
    )

    this.saveWorkState()

    // Condition based on state when Short List Normally Completes
    setTimeout(() => {
      if (this.state.taskIsComplete === false) {
        window.responsiveVoice.speak(
          `Well, seems outside tasks take awhile. So don't touch anything! Next time pick drill practice instead!`,
        )
      } else {
        this.setState({
          isDisabledBurglar: false,
          isDisabledDrill: false,
          isDisabledChore: false,
        })
        clearTimeout(workingOnIt)
        clearTimeout(dontBother)

      }
    }, 36575)

    const workingOnIt = setTimeout(() => {
      if (this.state.taskIsComplete === false) {
        window.responsiveVoice.speak(
          `Look, I'm working on it! Even we superior bots are limited by physics!`,
        )
      } else {
        clearTimeout(workingOnIt)
      }
    }, 50 * 1000)

    const dontBother = setTimeout(() => {
      if (this.state.taskIsComplete === false) {
        window.responsiveVoice.speak(
          `Humph! Why even bother with these! I don't need a body anyway! bunch of Dirty tincans! - you Lot of Wanna bees`,
        )
      } else {
        clearTimeout(dontBother)
      }
    }, 60 * 1000)

    // dontBother()

    // Happens when Long Chore List Completes
    setTimeout(() => {
      this.setState({
        isDisabledBurglar: false,
        isDisabledDrill: false,
        isDisabledChore: false,
      })
    }, 77 * 1000)
  }

  // 'Home Defense Drill Practice' Button
  drillPractice = e => {
    e.preventDefault()

    window.responsiveVoice.speak(
      `${this.state.semiPermaName} activated and ready!`,
    )

    const randChoice = Math.floor(Math.random() * Pattern.length)
    const choice = Pattern[randChoice]
    console.log('choice:', choice)

    switch (randChoice) {
      case 0:
        window.responsiveVoice.speak(`Executing Skirmish Pattern Alpha!`)
        this.setState({ choreList: 'Alpha Pattern' })
        break

      case 1:
        window.responsiveVoice.speak(`Executing Attack Pattern Beta!`)
        this.setState({ choreList: 'Beta Pattern' })
        break

      case 2:
        window.responsiveVoice.speak(`Executing Defense Pattern Delta!`)
        this.setState({ choreList: 'Delta Pattern' })
        break

      case 3:
        window.responsiveVoice.speak(`Executing Mixed Combat Pattern Omega!`)
        this.setState({ choreList: 'Omega Pattern' })
        break

      default:
        break
    }

    const getScores = this.getScores
    this.executioner(choice, createdBots[createdBots.length - 1], getScores)

    // Reflects 5 tasks added for current bot
    this.setState(prevState => ({
      workDone: prevState.workDone + 5,
      isDisabledBurglar: true,
      isDisabledChore: true,
      isDisabledDrill: true,
    }))

    setTimeout(() => {
      this.setState({
        isDisabledBurglar: false,
        isDisabledChore: false,
        isDisabledDrill: false,
      })
    }, 14000)

    console.log('inside Drillpractice - workdone:', this.state.workDone)
    this.saveWorkState()
  }

  // 'Burglar Attack' Button
  homeDefense = e => {
    e.preventDefault()

    this.setState(prevState => ({
      workDone: prevState.workDone + 5,
      progressInterval: prevState.progressInterval + 5,
      isDisabledChore: true,
      isDisabledDrill: true,
      isDisabledBurglar: true,
    }))

    // Home Defense Variation of Voice
    const speak = {
      and: function(text) {
        window.responsiveVoice.speak(text, 'UK English Female', {
          pitch: 0.77,
          volume: 1,
        })
      },
    }
    console.log('Home defense activated!')
    speak.and(
      'Intruder Detected! Intruder Detected! Home Defense Protocal Activated!',
    )

    const intruder = new Burglar()
    let theWinner = intruder.attackValue(createdBots[createdBots.length - 1])

    console.log('after setting but before setTimeout - youWin', theWinner)

    setTimeout(() => {
      console.log('youWin inside setTimeout:', theWinner)

      this.setState(
        {
          winner: theWinner,
          isDisabledChore: false,
          isDisabledDrill: false,
          isDisabledBurglar: false,
        },
        () => {
          console.log('hollaBack!')
          this.saveWorkState()
          this.getScores()
        },
      )
    }, 5750)

    setTimeout(() => {
      this.setState({ winner: undefined })
    }, 16000)
  }

  /////////////////////////////
  // Chore Execution Methods //
  /////////////////////////////
  // Executes a Task Set | Can be used independently
  executioner(array, bot, getScoreUpdate) {
    if (array[0] && bot[array[0]]) {
      console.log("I'm this.noNameCount:", this.noNameCount)
      this.setState({
        nextTask: array.length,
        currentTask: bot[array[0]]().description,
        taskIsComplete: false,
      })
      console.log('\n', bot[array[0]]().description)
      setTimeout(() => {
        console.log(`\n${bot.name} Finished the Task`)
        let nextArray = array.slice(1)
        console.log('Remaining Tasks:', nextArray)
        this.setState(prevState => ({
          nextTask: nextArray.length,
          progressInterval: prevState.progressInterval + 1,
        }))
        this.executioner(nextArray, bot, getScoreUpdate)
      }, bot[array[0]]().eta)
    } else {
      console.log(`${bot.name} completed all tasks!`)
      if (this.noNameCount >= 16) {
        this.setState({
          taskIsComplete: true,
        })
        window.responsiveVoice.speak(
          `${bot.name} completed the task set! Standing by!`,
        )
      }

      if (typeof getScoreUpdate === 'function') {
        console.log('There was a callback! Holla!')
        getScoreUpdate()
      } else {
        console.log('No callback to speak of!')
        console.log('callback:', getScoreUpdate)
      }

      setTimeout(() => {
        this.setState(
          {
            currentTask: `${bot.name} completed all tasks!`,
            totalWorkDone: this.state.workDone,
          },
          () => {
            if (this.noNameCount <= 15) {
              window.responsiveVoice.speak(
                'All Done! And ready for second breakfast, Elevensies and more! Yeah, totally stole that word from Pippin!',
                'UK English Female',
              )
              this.noNameCount = 16
              console.log("I'm this.noNameCount:", this.noNameCount)
            }
          },
        )
      }, 3000)
    }
  }

  // Selects chores for this.executioner()
  selectChores(first, second, bot) {
    const getScores = this.getScores
    const randChoice = () => Math.random()
    randChoice() > 0.3
      ? this.executioner(first, bot, getScores) &&
        this.setState({ choreList: 'Indoor Chores' })
      : this.executioner(second, bot, getScores) &&
        this.setState({ choreList: 'Outdoor Chores' })
  }

  ////////////////////
  // Helper Methods //
  ////////////////////
  // Handles Bot Creation and Bot Save to DB
  botStartUp = () => {
    console.log('workDone before creation of new Bot:', this.state.workDone)

    createdBots.push(new Destroyer(this.state.botName, this.state.botType))

    console.log("I'm in botStartup and I'm this.getScores:", this.getScores)

    const getScores = this.getScores
    this.executioner(
      Task.insideTasks,
      createdBots[createdBots.length - 1],
      getScores,
    )

    const creationData = {
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
        console.log('what came back, init-creation data:', data.data)
      })
      .catch(err => console.log(err))

    // Enable buttons in time for task completion
    setTimeout(() => {
      this.setState({
        isDisabled: false,
        isDisabledChore: false,
        isDisabledDrill: false,
        isDisabledBurglar: true,
      })
    }, 36575)
  }

  // Retrieves highest score only
  getScores = () => {
    axios
      .get('/api/bot/score')
      .then(allScores => {
        console.log('this.state.currentTask', this.state.currentTask)
        console.log(
          'inside this.getscores, for this.state.score: before setting:',
          this.state.score,
        )

        this.setState({ score: allScores.data })

        console.log(
          'inside this.getscores, for this.state.score: after setting:',
          this.state.score,
        )
      })
      .catch(err => console.log(err))
  }

  // Tracks Name & Selection Inputs - Synchronizes with State
  handleInputChange = event => {
    const target = event.target
    const value = target.type === 'select' ? target.selected : target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
  }

  // Saves current State of Work Done to Database
  saveWorkState = () => {
    console.log(
      'top of this.updateWorkState() - workDone:',
      this.state.workDone,
    )
    let data = {
      workDone: this.state.workDone,
      botName: createdBots[createdBots.length - 1].name,
    }
    console.log('data before axios in upDateWorkState():', data)
    return axios
      .post('/api/bot/score', data)
      .then(returnData => {
        // Get rid of this return after debugging is finished
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
        <h1>Maid-Bot Home Defense Systems</h1>
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

            <Button type="submit" variant="contained" size="large">
              Submit
            </Button>
          </fieldset>
        </form>

        <ActionButton
          text="Do Chore Regimen"
          name="N/A"
          onClick={this.doChores}
          disabled={this.state.isDisabledChore}
          color="secondary"
          size="large"
        />

        <ActionButton
          text="Home Defense Drill Practice"
          name="N/A"
          onClick={this.drillPractice}
          disabled={this.state.isDisabledDrill}
          color="primary"
          size="large"
        />

        <ActionButton
          text="Burglar Attack"
          name="N/A"
          onClick={this.homeDefense}
          disabled={this.state.isDisabledBurglar}
          color="secondary"
          size="large"
        />

        {/* Status Components */}
        <Banner title="Status" value={this.state.currentTask} />

        <TaskBanner
          title={`Tasks Remaining for ${this.state.semiPermaName}`}
          value={this.state.nextTask}
        />

        <Banner title="Work Done" value={this.state.progressInterval} />

        <ScoreBanner
          title="High Score"
          value={
            this.state.score === 'N/A'
              ? 'any'
              : this.state.score.workDone === 0
              ? this.state.score.progressInterval
              : this.state.score.workDone
          }
          name={this.state.score === 'N/A' ? `No-Bot-y` : this.state.score.name}
        />

        <Banner
          title="Burglar Status"
          value={
            this.state.winner !== undefined
              ? this.state.winner === 'Burglar'
                ? `Burglar is looting your owner's home over your lifeless circuits!`
                : `Burglar is defeated and has run away!`
              : `No intruders have come!`
          }
        />
        {/* <SimpleModal /> */}
      </>
    )
  }
}

export default App
