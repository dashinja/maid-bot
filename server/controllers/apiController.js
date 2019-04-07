const express = require('express')
const apiController = express.Router()
const db = require('../models')

apiController.route('/welcome').get((req, res) => {
  db.Welcome.findOne({})
    .then(result => {
      res.send(result)
    })
    .catch(err => console.log(err))
})

apiController.route('/bot/').post((req, res) => {
  db.Bot.create({
    name: req.body.name,
    botType: req.body.botType,
    workDone: req.body.workDone,
    attack: req.body.attack,
    defense: req.body.defense,
    speed: req.body.speed,
  })

  res.send(req.body)
})

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

apiController.route('/bot/score').post((req, res) => {
  const newValue = { workDone: req.body.workDone + 5 }

  db.Bot.update(newValue, {
    where: {
      name: req.body.botName,
    },
  }).then(result => {
    res.send(result)
  })
})

module.exports = apiController
