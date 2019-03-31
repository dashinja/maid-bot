const express = require('express')
const apiController = express.Router()
const db = require('../models')

apiController.route('/bot').get((req, res) => {
  res.send('hi')
})

apiController.route('/bot').post((req, res) => {
  console.log(req.body)

  db.Bot.create({
    name: req.body.name,
    botType: req.body.botType,
    workDone: req.body.workDone,
  })
  .then(result => {
    console.log(result.dataValues)
  })
  .catch(err=>console.log(err))
  res.send(req.body)
})

module.exports = apiController

