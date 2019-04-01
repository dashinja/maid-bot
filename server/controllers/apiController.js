const express = require('express')
const apiController = express.Router()
const db = require('../models')

apiController.route('/bot').get((req, res) => {
  res.send('hi')
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
    .then(result => {
      console.log(result.dataValues)
    })
    .catch(err => console.log(err))
  res.send(req.body)
})

apiController.route('/bot/score').get((req, res) => {
  db.Bot.findAll({
    attributes: ['name', 'botType', 'workDone'],
    order: [['workDone', 'DESC']],
    limit: 10,
  })
    .then(results => {
      //  const arrayResult = results.map(result=>))
      console.log(results.map(result => result.dataValues))
      res.json(results)
    })
    .catch(err => console.log(err))
})

apiController.route('/bot/score').post((req, res) => {
  console.log('req.body', req.body)

  const newValue = { workDone: req.body.workDone + 1 }
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
