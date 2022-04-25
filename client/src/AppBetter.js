import React, { PureComponent, useState } from 'react'
import axios from 'axios'
import './App.css'

//Helpers and Constants
import { CONSTANTS } from './constants'
import { Task, Pattern } from './patterns'
import { choreSequence, createValidation, Voices, femaleDefault, femaleDefensive, speakerHandler } from './helpers'

//Classes
import Destroyer from './bots'
import Burglar from './burglar'

//Components
import InfoPanel from './Components/InfoPanel'
import ButtonPanel from './Components/ButtonPanel'
import CreateForm from './Components/CreateForm'

let createdBots = []

const App = () => {
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
    chore: true,
    burglar: true,
    drill: true
  })
  const [score, setScore] = useState('high score')
  const [counters, setCounters] = useState({
    choreClick: 0,
    submitClick: 0,
    progressInterval: 0
  })


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
    }
  }

  const createBot = async e => {
    e.preventDefault()

    getScores()

    const botNameValidation = await botNameIsValid()

    if (botNameValidation) {
      setWorkTasks(workTasks, ...{ workTasks: 5 })
      setbot(bot, ...{ botName, semiPermaName: botName || 'Bot' })

      const { submitClick } = counters

      switch (bot.semiPermaName) {
        case '':
        case 'Bot':
          createValidation(submitClick, '')
          setCounters(counters, ...{ submitClick: submitClick + 1 })
          break;

        default:
          createValidation(submitClick, bot.semiPermaName)
          botStartup()
          break;
      }
      setCounters(counters, ...{})
    }
  }

  speakerHandler(2, '').then(() => setbot(bot, ...{ botType: 'Bipedal', botName: '' }))
}