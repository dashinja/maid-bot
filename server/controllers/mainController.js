const express = require('express')
const mainController = express.Router()
const db = require('../models')

mainController.route("*").get((req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

 

module.exports = mainController