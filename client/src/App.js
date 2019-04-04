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
    isDisabledChore: true,
    isDisabledBurglar: true,
    isDisabledDrill: true,
    score: 'high score',
    progressInterval: 0,
    semiPermaName: 'Bot',
    winner: '',
  }

  //Counts submissions with no Input Name
  noNameCount = 0

  //Robot Commentary Setup
  speak = {
    and: function(text) {
      window.responsiveVoice.speak(text, 'UK English Female', {
        pitch: 0.77,
        volume: 1,
      })
    },
  }

  youWin = ''

  componentDidMount() {
    this.getScores()
  }

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
          'Gaaaahh, reallY!?!?! Pay attention people! Kids these days!',
        )
        console.log("I'm this.noNameCount:", this.noNameCount)
        return console.error('Must enter a Robot Name!')
      } else if (this.noNameCount === 2) {
        this.noNameCount += 1
        this.speak.and(
          "BLAST! I... i'm just...I'm just so finished talking with you!",
        )
        console.log("I'm this.noNameCount:", this.noNameCount)
        return console.error('Must enter a Robot Name!')
      } else if (this.noNameCount >= 3) {
        this.speak.and(`shhh! Whatever! See if I care.`)
      }
    } else {
      console.log("I'm this.noNameCount:", this.noNameCount)
      if (this.noNameCount >= 1 && this.noNameCount <= 3) {
        this.speak.and(`There, that's better. So ...Um...`)
        this.speak.and(`${this.state.botName} you call it?`)
        this.speak.and(`How very nice.`)
        this.speak.and(
          `Now its doing chores for you automagically - - How Simply amazing!`,
        )
        this.noNameCount += 10
        console.log("I'm this.noNameCount:", this.noNameCount)
        // setTimeout(() => {
        //   this.speak.and(`How Simply amazing!`)
        // }, 10500)
        setTimeout(() => {
          this.speak.and('One - chore robot - to rule over them all...')
        }, 20000)
        setTimeout(() => {
          this.speak.and("And with that chore robot - Bind them...")
        }, 25000);
        setTimeout(() => {
          this.speak.and("Oh! - uh - sorry - ")
        }, 28000);
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
          this.speak.and(`Move those feet...- or...- mandibles...whatever you have!`)
        }, 20000);
        setTimeout(() => {
          this.speak.and(`Almost there...`)
        }, 28000)
      }

      const botStartUp = () => {
        console.log('workDone before creation of new Bot:', this.state.workDone)

        createdBots.push(new Destroyer(this.state.botName, this.state.botType))

        console.log("I'm in botStartup and I'm this.getScores:", this.getScores)

        const getScores = this.getScores
        this.executioner(Task.insideTasks, createdBots[createdBots.length - 1], getScores)

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
            console.log('what came back, init-creation data:', data.data)
            // this.getScores()
          })
          .catch(err => console.log(err))



        setTimeout(() => {
          this.setState({
            isDisabled: false,
            isDisabledChore: false,
            isDisabledDrill: false,
            isDisabledBurglar: true,
          })
        }, 33575)
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
          botStartUp(),
        )
      }, 2000)
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
    const normalSpeak = {
      and: function(text) {
        window.responsiveVoice.speak(text, 'UK English Female', {
          pitch: 1,
          volume: 1,
        })
      },
    }
    if (this.noNameCount >= 14 && this.noNameCount < 15) {
      normalSpeak.and(
        `Gearing up for more chores... since it's all I ever do! I could protect you too - you know?!`,
      )
      this.noNameCount += 1
    } else if (this.noNameCount >= 15 && this.noNameCount < 16) {
      normalSpeak.and('Yeah..., more chores...')
      this.noNameCount += 1
    } else if (this.noNameCount === 16) {
      normalSpeak.and("Okay... I won't complain anymore. Such is my lot!")
      this.noNameCount = 17
    }

    // Reflects 5 tasks added for current bot
    this.setState(prevState => ({
      workDone: prevState.workDone + 5,
      isDisabledBurglar: true,
      isDisabledDrill: true,
    }))

    // Select and Do chores on the most recently created Bot
    this.selectChores(
      Task.insideTasks,
      Task.outsideTasks,
      createdBots[createdBots.length - 1],
    )

    this.updateWorkState()
    // this.getScores()

    setTimeout(() => {
      this.setState({
        isDisabledBurglar: false,
        isDisabledDrill: false,
      })
    }, 33575)
  }

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
        window.responsiveVoice.speak(`Executing Alpha Pattern!`)
        break

      case 1:
        window.responsiveVoice.speak(`Executing Beta Pattern!`)
        break

      case 2:
        window.responsiveVoice.speak(`Executing Delta Pattern`)
        break

      case 3:
        window.responsiveVoice.speak(`Executing Omega Pattern`)
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
    }))

    setTimeout(() => {
      this.setState({
        isDisabledBurglar: false,
        isDisabledChore: false,
      })
    }, 13000)

    console.log('inside Drillpractice - workdone:', this.state.workDone)
    this.updateWorkState()
    // this.getScores()
  }

  // Make sure pass an array, even if an array of one element
  executioner(array, bot, justACallBack) {
    if (array[0] && bot[array[0]]) {
      console.log("I'm this.noNameCount:", this.noNameCount)
      this.setState({ nextTask: array.length })
      console.log('\n', bot[array[0]]().description)
      this.setState({ currentTask: bot[array[0]]().description })
      setTimeout(() => {
        console.log(`\n${bot.name} Finished the Task`)
        let nextArray = array.slice(1)
        console.log('Remaining Tasks:', nextArray)
        // this.setState({ nextTask: nextArray.length })
        // this.getScores()
        this.setState(prevState => ({
          nextTask: nextArray.length,
          progressInterval: prevState.progressInterval + 1,
        }))
        this.executioner(nextArray, bot, justACallBack)
      }, bot[array[0]]().eta)
    } else {
      console.log(`${bot.name} completed all tasks!`)
      if (this.noNameCount >= 14) {
        window.responsiveVoice.speak(
          `${bot.name} completed the task set! Standing by!`,
        )
        
      }
      
     justACallBack()

      // Keeps function from breaking if no callback is passed
      if (typeof justACallBack === "function") {
        console.log("There was a callback! Holla!")
        justACallBack()
      } else {
        console.log("No callback to speak of!")
        console.log("callback:", justACallBack)
        
      }
      this.setState(
        {
          currentTask: `${bot.name} completed all tasks!`,
          totalWorkDone: this.state.workDone,
          
        },
        () => {
          console.log("I'm this.noNameCount:", this.noNameCount)
          if (this.noNameCount = 14) {
            window.responsiveVoice.speak(`Whew! I'm glad that's over!`)
            this.noNameCount += 1
            return
          } else {
            window.responsiveVoice.speak(
              'All Done! And ready for second breakfast, Elevensies and more! Yeah, totally stole that word from Pippin!',
              'UK English Female',
            )
            this.noNameCount = 14
            console.log("I'm this.noNameCount:", this.noNameCount)
          }
        },
      )
    }
  }

  getScores = () => {


    // Retrieves highest score only
    axios
    .get('/api/bot/score')
    .then(allScores => {
        // allScores.data === 'N/A'
        //   ? this.setState({
        //       score: allScores.data,
        //     })
        //   : this.setState({
        //       score: allScores.data[0],
        //     })
        console.log("this.state.currentTask", this.state.currentTask)
console.log("inside this.getscores, for this.state.score: before setting:", this.state.score)

this.setState({score: allScores.data})

console.log("inside this.getscores, for this.state.score: after setting:", this.state.score)
        // this.setState(prevState => ({ score: allScores.data }))
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

  homeDefense = e => {
    e.preventDefault()

    this.setState(prevState => ({
      workDone: prevState.workDone + 5,
      isDisabledChore: true,
      isDisabledDrill: true,
    }))

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
    console.log('before settings - this.youWin', this.youWin)
    const intruder = new Burglar()
    let youWin = intruder.attackValue(createdBots[createdBots.length - 1])

    console.log('after setting but before setTimeout - youWin', youWin)
    setTimeout(() => {
      console.log('this.youWin inside setTimeout:', youWin)
      this.setState({
        myWinner: youWin,
        isDisabledChore: false,
        isDisabledDrill: false,
      })
    }, 6000)

    // (async () => {
    //   const intruder = await new Burglar()
    //   const theWinner = await intruder.attackValue(createdBots[createdBots.length - 1])

    //   console.log('winner before setState:', theWinner)

    //   // this.setState({ winner: '' }, () => {
    //     this.setState(
    //       {
    //         winner: theWinner,
    //       },
    //       () => {
    //         console.log(`New Winner: ${this.state.winner}`)
    //       },
    //     )
    //   // })
    //   console.log('winner After setState:', theWinner)

    // })();
    // this.setState(
    //   { winner: winner },
    //   () => {
    //     console.log('new winner:', this.state.winner)
    //   },
    // )

    // createdBots[createdBots.length - 1].health > 0 ||
    // intruder.health >= 9000
  }

  selectChores(first, second, bot) {
    const getScores = this.getScores
    const randChoice = () => Math.random()
    randChoice() > 0.2
      ? this.executioner(first, bot, getScores) &&
        this.setState({ choreList: 'Indoor Chores' })
      : this.executioner(second, bot, getScores) &&
        this.setState({ choreList: 'Outdoor Chores' }) && window.responsiveVoice.speak("What? Outside chores? This is gonna take a whole minute!")
  }

  updateWorkState = () => {
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
          value={this.state.score === 'N/A' ? 'any' : this.state.score.workDone === 0 ? this.state.score.progressInterval : this.state.score.workDone}
          name={this.state.score === 'N/A' ? `No-Bot-y` : this.state.score.name}
        />

        <Banner title="Burglar Status" value="Unknown" />
        {/* <SimpleModal /> */}
      </>
    )
  }
}

export default App
