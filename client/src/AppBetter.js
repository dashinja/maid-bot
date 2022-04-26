import React, { useState } from 'react'
import axios from 'axios'
import './App.css'

//Helpers and Constants
import { CONSTANTS } from './constants'
import { Task, Pattern } from './patterns'
import { choreSequence, createValidation, femaleDefault, femaleDefensive, speakerHandler } from './helpers'

//Classes
import Destroyer from './bots'
import Burglar from './burglar'

//Components
import InfoPanel from './Components/InfoPanel'
import ButtonPanel from './Components/ButtonPanel'
import CreateForm from './Components/CreateForm'

let createdBots = []

const AppBetter = () => {
  const [bot, setbot] = useState({
    botName: '',
    botType: 'Bibedal',
    semiPermaName: 'Bot'
  })
  const [workTasks, setWorkTasks] = useState({
    workDone: 0,
    currentTask: 'Awaiting Bot Creation',
    nextTask: 0,
    choreList: '',
    taskIsComplete: true
  })
  const [isDisabled, setIsDisabled] = useState({
    isDisabledChore: true,
    isDisabledBurglar: true,
    isDisabledDrill: true
  })
  const [score, setScore] = useState('high score')
  const [winner, setWinner] = useState()
  const [counters, setCounters] = useState({
    choreClick: 0,
    submitClick: 0,
    progressInterval: 0
  })
  const [changeState, setChangeState] = useState()


  const getScores = async () => {
    try {
      const allScores = await axios.get('/api/bot/score')
      setScore(allScores.data)
    } catch (error) {
      console.error(error)
    }
  }

  const botNameIsValid = async () => {
    let validationReturn

    if (bot.botName === '') {
      return true
    } else {
      const { botName } = bot
      const data = {
        name: botName
      }

      try {
        console.log("right here, first API call")
        const result = await axios.post('api/bot/name', data)

        if (!result.data) {
          speakerHandler(0, 'Bot Name Already Taken! You MUST Choose Another')
          validationReturn = false
          return false
        } else {
          validationReturn = result
          return true
        }
      } catch (error) {
        console.error(error)
      }

      return validationReturn
    }
  }

  const executioner = (array, bot, scoreUpdate, count) => {
    let executionCount = count
    if (array[0] && bot[array[0]]) {
      setWorkTasks(workTasks, ...{ nextTask: array.length, currentTask: bot[array[0]]().description, taskIsComplete: false })

      speakerHandler(bot[array[0]]().eta, '')
        .then(() => {
          let nextArray = array.slice(1)
          setWorkTasks(workTasks, ...{ nextTask: nextArray.length })
          setCounters(counters, ...{ progressInterval: counters.progressInterval + 1 })
          executionCount += 1
          executioner(nextArray, bot, scoreUpdate, count)
        })
    } else {
      if (executionCount >= 16) {
        setWorkTasks(workTasks, ...{ taskIsComplete: true })
        speakerHandler(0, `${bot.botName} completed the task set! Standing by!`)
      }

      if (typeof scoreUpdate === 'function') {
        scoreUpdate()
      }

      speakerHandler(3, '')
        .then(() => {
          setWorkTasks(workTasks, ...{ currentTask: `${bot.botName} completed all tasks!` })
        })
        .then(() => {
          if (executionCount <= 15) {
            speakerHandler(0, 'All Done! And ready for second breakfast, Elevensies and more! Yeah, totally stole that word from Pippin!')
              .then(() => executionCount = 16)
          }
        })
    }
  }

  const botStartup = () => {
    createdBots.push(new Destroyer(bot.botName, bot.botType))


    getScores()
    executioner(Task.insideTasks, createdBots[createdBots.length - 1], score, 15)

    const creationData = {
      name: bot.botName,
      botType: bot.botType,
      workDone: workTasks.workDone,
      attack: createdBots[createdBots.length - 1].attackValue().attack,
      defense: createdBots[createdBots.length - 1].defenseValue().defense,
      speed: createdBots[createdBots.length - 1].speedValue().speed
    }

    axios.post('/api/bot', creationData).catch(err => console.error(err))

    speakerHandler((36575 / 1000), '')
      .then(() => setIsDisabled({ isDisabledChore: false, isDisabledDrill: false, isDisabledBurglar: true }))
      .then(() => setCounters(counters, ...{ submitClick: 0 }))
  }

  const createBot = async e => {
    e.preventDefault()

    getScores()

    const botNameValidation = await botNameIsValid()

    if (botNameValidation) {
      setWorkTasks({ workTasks, ...{ workTasks: 5 } })
      setbot({ bot, ...{ botName: bot.botName, semiPermaName: bot.botName || 'Bot' } })

      const { submitClick } = counters

      switch (bot.semiPermaName) {
        case '':
        case 'Bot':
          createValidation(submitClick, '')
          setCounters({ counters, ...{ submitClick: submitClick + 1 } })
          break;

        default:
          createValidation(submitClick, bot.semiPermaName)
          botStartup()
          break;
      }
    }

    speakerHandler(2, '')
      .then(() => setbot({ bot, ...{ botType: 'Bipedal', botName: '' } }))
  }

  const selectChores = (first, second, bot, count) => {
    const randChoice = () => Math.random()
    randChoice() > 0.3
      ? executioner(first, bot, getScores, count) &&
      setWorkTasks({ workTasks, ...{ choreList: 'Indoor Chores' } })
      : executioner(second, bot, getScores, count) &&
      setWorkTasks({ workTasks, ...{ choreList: 'Outdoor Chores' } })
  }

  const saveWorkState = async () => {
    let data = { workDone: workTasks.workDone, botName: bot.botName }
    try {
      return await axios.post('/api/bot/score', data)
    } catch (err) {
      return console.error(err)
    }
  }

  const doChores = e => {
    e.preventDefault()

    setIsDisabled({
      isDisabledBurglar: true,
      isDisabledDrill: true,
      isDisabledChore: true,
    })

    setWorkTasks({ workTasks, ...{ taskIsComplete: false } })
    setCounters({ counters, ...{ choreClick: counters.choreClick + 1 } })

    switch (counters.choreClick) {
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

    selectChores(Task.insideTasks, Task.outsideTasks, createdBots[createdBots.length - 1], 16)

    saveWorkState()

    const workingOnIt = setTimeout(() => {
      if (workTasks.taskIsComplete === false) {
        femaleDefault.and(CONSTANTS.SPEECH.CHORES.LOOK)
      } else {
        clearTimeout(workingOnIt)
      }
    }, 50 * 1000)

    const dontBother = setTimeout(() => {
      if (workTasks.taskIsComplete === false) {
        femaleDefault.and(CONSTANTS.SPEECH.CHORES.BOTHER)
      } else {
        clearTimeout(dontBother)
      }
    }, 60 * 1000)

    speakerHandler((38575 / 1000), '')
      .then(() => {
        if (workTasks.taskIsComplete === false) {
          speakerHandler(0, CONSTANTS.SPEECH.CHORES.LONG)
        } else {
          setIsDisabled({
            isDisabledBurglar: false,
            isDisabledDrill: false,
            isDisabledChore: false,
          })

          clearTimeout(workingOnIt)
          clearTimeout(dontBother)
        }
      })


    speakerHandler(77, '')
      .then(() => setIsDisabled({ isDisabledBurglar: false, isDisabledChore: false, isDisabledDrill: false }))



  }

  const drillPractice = e => {
    e.preventDefault()

    femaleDefault.and(`${this.state.semiPermaName} activated and ready!}`)

    const randChoice = Math.floor(Math.random() * Pattern.length)
    const choice = Pattern[randChoice]

    switch (randChoice) {
      case 0:
        femaleDefault.and(CONSTANTS.SPEECH.DRILL_PRACTICE.ALPHA)
        setWorkTasks({ workTasks, ...{ choreList: 'Alpha Pattern' } })
        break

      case 1:
        femaleDefault.and(CONSTANTS.SPEECH.DRILL_PRACTICE.BETA)
        setWorkTasks({ workTasks, ...{ choreList: 'Beta Pattern' } })
        break

      case 2:
        femaleDefault.and(CONSTANTS.SPEECH.DRILL_PRACTICE.DELTA)
        setWorkTasks({ workTasks, ...{ choreList: 'Delta Pattern' } })
        break

      case 3:
        femaleDefault.and(CONSTANTS.SPEECH.DRILL_PRACTICE.OMEGA)
        setWorkTasks({ workTasks, ...{ choreList: 'Omega Pattern' } })
        break

      default:
        break
    }

    executioner(choice, createdBots[createdBots.length - 1], getScores, 16)

    setWorkTasks({ workTasks, ...{ workDone: workTasks.workDone + 5 } })
    setIsDisabled({ isDisabledBurglar: true, isDisabledChore: true, isDisabledDrill: true })

    speakerHandler(14, '')
      .then(() => setIsDisabled({ isDisabledBurglar: false, isDisabledChore: false, isDisabledDrill: false }))

    saveWorkState()
  }

  const saveBurglarState = async () => {
    let data = {
      workDone: workTasks.workDone,
      botName: createdBots[createdBots.length - 1].name
    }

    try {
      await axios.post('/api/bot/score', data)
      axios.get('/api/bot/score')
        .then(allScores => {
          setWorkTasks({ workTasks, ...{ workDone: counters.progressInterval } })
          setScore(allScores.data)
        })
        .catch(err => console.error(err))
    } catch (err_1) {
      return console.error(err_1)
    }
  }

  const burglarDefense = e => {
    e.preventDefault()

    setIsDisabled({ isDisabledBurglar: true, isDisabledChore: true, isDisabledDrill: true })
    setCounters({ counters, ...{ progressInterval: counters.progressInterval + 5 } })

    femaleDefensive.speak(CONSTANTS.SPEECH.DEFENSE.ALERT)
    const intruder = new Burglar()
    intruder.attackValue(createdBots[createdBots.length - 1])

    speakerHandler(5.75, '')
      .then(() => {
        setIsDisabled({ isDisabledBurglar: false, isDisabledChore: false, isDisabledDrill: false })
        saveBurglarState()
      })

    speakerHandler(16, '')
      .then(() => setWinner(undefined))

  }

  const bonusSass = () => {
    const bonus = CONSTANTS.SPEECH.BONUS.SASS
    const choice = Math.ceil(Math.random() * bonus.length - 1)
    const bonusChoice = bonus[choice]
    femaleDefault.and(bonusChoice)
  }

  const handleInputChange = event => {
    const { target } = event
    const value = target.type === 'select' ? target.selected : target.value
    const name = target.name

    setChangeState({ [name]: value })
  }



  return (
    <>
      <CreateForm
        onSubmit={createBot}
        botName={bot.botName}
        botType={bot.botType}
        handleInputChange={handleInputChange}
      />

      <ButtonPanel
        formSubmit={createBot}
        botName={bot.botName}
        botType={bot.botType}
        handleInputChange={handleInputChange}
        doChores={doChores}
        isDisabledChore={isDisabled.isDisabledChore}
        drillPractice={drillPractice}
        isDisabledDrill={isDisabled.isDisabledDrill}
        burglarDefense={burglarDefense}
        isDisabledBurglar={isDisabled.isDisabledBurglar}
      />

      <InfoPanel
        currentTask={workTasks.currentTask}
        semiPermaName={bot.semiPermaName}
        nextTask={workTasks.nextTask}
        progressInterval={counters.progressInterval} //shows "work done"
        winner={winner}
        score={score} // taken from database
        bonusSass={bonusSass}
      />

    </>
  )
}

export default AppBetter