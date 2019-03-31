const express = require('express')
const apiController = express.Router()
const db = require('../models')

apiController.route('/bot').get((req, res) => {
  res.send('hi')
})

apiController.route('/bot').post((req, res) => {
  console.log(req.body)
  res.send(req.body)
})

module.exports = apiController

