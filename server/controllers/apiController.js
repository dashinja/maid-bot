const express = require('express')
const apiController = express.Router()
const db = require('../models')

// Creates DB Entry with User Bot Input
apiController.route('/bot').post((req, res) => {
  if (!req.body.name || !req.body.botType) {
    res.send(console.error('Bot name already taken, please choose another!'))
    return
  } else {
    db.Bot.create({
      name: req.body.name,
      botType: req.body.botType,
      workDone: req.body.workDone,
      attack: req.body.attack,
      defense: req.body.defense,
      speed: req.body.speed,
    }).catch(err => console.log(err))

    res.send(req.body)
  }
})

// Validation call to prevent BotName Duplication
apiController.route('/bot/name').post((req, res) => {
  db.Bot.findOne({
    where: {
      name: req.body.name,
    },
  })
    .then(result => {
      // If botName already used, return valid = false
      if (result !== null) {
        res.json(false)
      } else {
        res.json(true)
      }
    })
    .catch(err => console.log(err))
})

// Retrieves highest score
apiController.route('/bot/score').get((req, res) => {
  db.Bot.findOne({
    attributes: ['name', 'botType', 'workDone'],
    order: [['workDone', 'DESC']],
    limit: 1,
  })
    .then(result => {
      if (result === null) {
        res.send('N/A')
      } else {
        res.json(result)
      }
    })
    .catch(err => console.log(err))
})

// Calculates and Inserts new Score in DB for current Bot
apiController.route('/bot/score').post((req, res) => {
  const newValue = { workDone: req.body.workDone + 5 }

  db.Bot.update(newValue, {
    where: {
      name: req.body.botName,
    },
  })
    .then(result => {
      res.send(result)
    })
    .catch(err => console.log(err))
})

module.exports = apiController
