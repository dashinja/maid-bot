// Packages
import React, { Component } from 'react'
import axios from 'axios'
import './App.css'

// Helpers and Constants
import { CONSTANTS } from './constants'
import { Task, Pattern } from './patterns'
import { choreSequence, createValidation, femaleDefault, femaleDefensive } from './helpers'

// Classes
import Destroyer from './bots'
import Burglar from './burglar'

// Components
import InfoPanel from './Components/InfoPanel'
import ButtonPanel from './Components/ButtonPanel'
import CreateForm from './Components/CreateForm'

let createdBots = []

class App extends Component {
  state = {
    botName: ``,
    botType: 'Bipedal',
    workDone: 0,
    currentTask: 'Awaiting Bot Creation',
    nextTask: 0, // Countdown Counter
    choreList: '', // Tracks drill list name
    taskIsComplete: true, // Reports task set status
    isDisabledChore: true,
    isDisabledBurglar: true,
    isDisabledDrill: true,
    score: 'high score', // Tracks High Score
    progressInterval: 0, // Count up Counter
    semiPermaName: 'Bot', // Persistent naming variable
    choreClick: 0, // Chore Click Counter
    submitClick: 0, // Submit Button Click Counter
  }

  componentDidMount() {
    this.getScores()
  }

  ////////////////////
  // Button Methods //
  ////////////////////
  // 'Submit' Button
  createBot = async e => {
    e.preventDefault()
    
    this.getScores()

    // Checks database for duplcates, if no duplicates executes bot creation
    const botNameValidation = await this.botNameIsValid()

    setTimeout(() => {
      if (botNameValidation) {
        this.setState(
          prevState => {
            return {
              botName: this.state.botName,
              semiPermaName: this.state.botName || 'Bot',
              workDone: 5,
              progressInterval: 0,
              isDisabledBurglar: true,
              isDisabledChore: true,
              isDisabledDrill: true,
              // eslint-disable-next-line
            }
          },
          () => {
            let counter = this.state.submitClick

            switch (this.state.semiPermaName) {
              case '':
              case 'Bot':
                createValidation(counter, '')
                this.setState(prevState => ({
                  submitClick: prevState.submitClick + 1,
                }))
                break

              default:
                createValidation(counter, this.state.semiPermaName)
                this.botStartUp()
                break
            }
          },
        )
      } else {
        return
      }
    }, 1000)

    setTimeout(() => {
      this.setState({
        botName: '',
        botType: 'Bipedal',
      })
    }, 2000)
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
        choreSequence(16)
        break

      case 1:
        choreSequence(17)
        break

      case 2:
        choreSequence(18)
        break

      default:
        break
    }

    // Select and Do chores on the most recently created Bot
    this.selectChores(
      Task.insideTasks,
      Task.outsideTasks,
      createdBots[createdBots.length - 1],
      16,
    )

    this.saveWorkState()

    // Condition based on state when Short List Normally Completes
    setTimeout(() => {
      if (this.state.taskIsComplete === false) {
        femaleDefault.and(CONSTANTS.SPEECH.CHORES.LONG)
      } else {
        this.setState({
          isDisabledBurglar: false,
          isDisabledDrill: false,
          isDisabledChore: false,
        })
        clearTimeout(workingOnIt)
        clearTimeout(dontBother)
      }
    }, 38575)

    const workingOnIt = setTimeout(() => {
      if (this.state.taskIsComplete === false) {
        femaleDefault.and(CONSTANTS.SPEECH.CHORES.LOOK)
      } else {
        clearTimeout(workingOnIt)
      }
    }, 50 * 1000)

    const dontBother = setTimeout(() => {
      if (this.state.taskIsComplete === false) {
        femaleDefault.and(CONSTANTS.SPEECH.CHORES.BOTHER)
      } else {
        clearTimeout(dontBother)
      }
    }, 60 * 1000)

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

    femaleDefault.and(`${this.state.semiPermaName} activated and ready!`)

    const randChoice = Math.floor(Math.random() * Pattern.length)
    const choice = Pattern[randChoice]

    switch (randChoice) {
      case 0:
        femaleDefault.and(CONSTANTS.SPEECH.DRILL_PRACTICE.ALPHA)
        this.setState({ choreList: 'Alpha Pattern' })
        break

      case 1:
        femaleDefault.and(CONSTANTS.SPEECH.DRILL_PRACTICE.BETA)
        this.setState({ choreList: 'Beta Pattern' })
        break

      case 2:
        femaleDefault.and(CONSTANTS.SPEECH.DRILL_PRACTICE.DELTA)
        this.setState({ choreList: 'Delta Pattern' })
        break

      case 3:
        femaleDefault.and(CONSTANTS.SPEECH.DRILL_PRACTICE.OMEGA)
        this.setState({ choreList: 'Omega Pattern' })
        break

      default:
        break
    }

    const getScores = this.getScores
    this.executioner(choice, createdBots[createdBots.length - 1], getScores, 16)

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

    this.saveWorkState()
  }

  // 'Burglar Attack' Button
  burglarDefense = e => {
    e.preventDefault()

    this.setState(prevState => ({
      isDisabledChore: true,
      isDisabledDrill: true,
      isDisabledBurglar: true,
      progressInterval: prevState.progressInterval + 5,
    }))

    femaleDefensive.speak(CONSTANTS.SPEECH.DEFENSE.ALERT)

    const intruder = new Burglar()
    let theWinner = intruder.attackValue(createdBots[createdBots.length - 1])

    setTimeout(() => {
      this.setState(
        prevState => {
          return {
            isDisabledChore: false,
            isDisabledDrill: false,
            isDisabledBurglar: false,
            winner: theWinner,
          }
        },
        () => {
          this.saveBurglarState()
        },
      )
    }, 5750)

    setTimeout(() => {
      this.setState({ winner: undefined })
    }, 16000)
  }

  bonusSass = () => {
    const bonus = CONSTANTS.SPEECH.BONUS.SASS
    const choice = Math.ceil(Math.random() * bonus.length - 1)
    const bonusChoice = bonus[choice]
    femaleDefault.and(bonusChoice)
  }

  /////////////////////////////
  // Chore Execution Methods //
  /////////////////////////////
  // Executes a Task Set | Can be used independently
  executioner(array, bot, getScoreUpdate, count) {
    let executionCount = count
    if (array[0] && bot[array[0]]) {
      this.setState({
        nextTask: array.length,
        currentTask: bot[array[0]]().description,
        taskIsComplete: false,
      })
      setTimeout(() => {
        let nextArray = array.slice(1)
        this.setState(prevState => ({
          nextTask: nextArray.length,
          progressInterval: prevState.progressInterval + 1,
        }))
        executionCount += 1
        this.executioner(nextArray, bot, getScoreUpdate, count)
      }, bot[array[0]]().eta)
    } else {
      if (executionCount >= 16) {
        this.setState({
          taskIsComplete: true,
        })
        femaleDefault.and(`${bot.name} completed the task set! Standing by!`)
      }

      if (typeof getScoreUpdate === 'function') {
        getScoreUpdate()
      }

      setTimeout(() => {
        this.setState(
          {
            currentTask: `${bot.name} completed all tasks!`,
          },
          () => {
            if (executionCount <= 15) {
              femaleDefault.and(
                'All Done! And ready for second breakfast, Elevensies and more! Yeah, totally stole that word from Pippin!',
                'UK English Female',
              )
              executionCount = 16
            }
          },
        )
      }, 3000)
    }
  }

  // Selects chores for this.executioner()
  selectChores(first, second, bot, count) {
    const getScores = this.getScores
    const randChoice = () => Math.random()
    randChoice() > 0.3
      ? this.executioner(first, bot, getScores, count) &&
        this.setState({ choreList: 'Indoor Chores' })
      : this.executioner(second, bot, getScores, count) &&
        this.setState({ choreList: 'Outdoor Chores' })
  }

  ////////////////////
  // Helper Methods //
  ////////////////////

  botNameIsValid = async () => {
    let validationReturn
    if (this.state.botName === '') {
      return true
    } else {
      const botName = this.state.botName
      const data = {
        name: botName,
      }
      await axios
        .post('api/bot/name', data)
        .then(result => {
          if (!result.data) {
            femaleDefault.and('Bot Name Already Taken! You MUST Choose Another')
            validationReturn = false
            return false
          } else {
            validationReturn = result
            return true
          }
        })
        .catch(err => console.log(err))
      return validationReturn
    }
  }

  // Handles Bot Creation and Bot Save to DB
  botStartUp = () => {
    createdBots.push(new Destroyer(this.state.botName, this.state.botType))

    const getScores = this.getScores
    this.executioner(
      Task.insideTasks,
      createdBots[createdBots.length - 1],
      getScores,
      15,
    )

    const creationData = {
      name: this.state.botName,
      botType: this.state.botType,
      workDone: 5,
      attack: createdBots[createdBots.length - 1].attackValue().attack,
      defense: createdBots[createdBots.length - 1].defenseValue().defense,
      speed: createdBots[createdBots.length - 1].speedValue().speed,
    }

    axios.post('/api/bot', creationData).catch(err => console.log(err))

    // Enable buttons in time for task completion
    setTimeout(() => {
      this.setState({
        isDisabledChore: false,
        isDisabledDrill: false,
        isDisabledBurglar: true,
        submitClick: 0,
      })
    }, 36575)
  }

  // Retrieves highest score only
  getScores = () => {
    axios
      .get('/api/bot/score')
      .then(allScores => {
        this.setState({ score: allScores.data })
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
    let data = {
      workDone: this.state.workDone,
      botName: createdBots[createdBots.length - 1].name,
    }
    return axios.post('/api/bot/score', data).catch(err => console.log(err))
  }

  saveBurglarState = () => {
    let data = {
      workDone: this.state.workDone,
      botName: createdBots[createdBots.length - 1].name,
    }
    return axios
      .post('/api/bot/score', data)
      .then(() => {
        axios
          .get('/api/bot/score')
          .then(allScores => {
            this.setState({
              workDone: this.state.progressInterval,
              score: allScores.data,
            })
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <>
        <CreateForm
          onSubmit={this.createBot}
          botName={this.state.botName}
          botType={this.state.botType}
          handleInputChange={this.handleInputChange}
        />

        <ButtonPanel
          formSubmit={this.createBot}
          botName={this.state.botName}
          botType={this.state.botType}
          handleInputChange={this.handleInputChange}
          doChores={this.doChores}
          isDisabledChore={this.state.isDisabledChore}
          drillPractice={this.drillPractice}
          isDisabledDrill={this.state.isDisabledDrill}
          burglarDefense={this.burglarDefense}
          isDisabledBurglar={this.state.isDisabledBurglar}
        />

        <InfoPanel
          currentTask={this.state.currentTask}
          semiPermaName={this.state.semiPermaName}
          nextTask={this.state.nextTask}
          progressInterval={this.state.progressInterval} //shows "work done"
          winner={this.state.winner}
          score={this.state.score} // taken from database
          bonusSass={this.bonusSass}
        />
      </>
    )
  }
}

export default App
