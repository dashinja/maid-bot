const express = require('express')
const mainController = express.Router()
const db = require('../models')

mainController.route("/")

module.exports = mainController