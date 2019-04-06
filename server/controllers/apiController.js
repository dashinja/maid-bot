const express = require('express')
const apiController = express.Router()
const db = require('../models')

apiController.route('/bot/').post((req, res) => {
  db.Bot.create({
    name: req.body.name,
    botType: req.body.botType,
    workDone: req.body.workDone,
    attack: req.body.attack,
    defense: req.body.defense,
    speed: req.body.speed,
  })
    .then(result => {
      console.log(result.dataValues)
    })
    .catch(err => console.log(err))
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
  console.log('req.body.workDone', req.body.workDone)

  const newValue = { workDone: req.body.workDone + 5 }
  console.log('newvalue.workDone:', newValue.workDone)
  db.Bot.update(newValue, {
    where: {
      name: req.body.botName,
    },
  }).then(result => {
    console.log('Updated to by:', result)
    res.send(result)
  })
})

module.exports = apiController
