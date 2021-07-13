const express = require('express')
const apiController = express.Router()
const db = require('../models')
// const bcrypt = require('../node_modules/brcypt');
const bcrypt = require('bcrypt');

const saltRounds = 10

// Creates DB Entry with User Bot Input
apiController.route('/bot').post(async (req, res) => {
  if (!req.body.name || !req.body.botType) {
    res.send(console.error('Bot name already taken, please choose another!'))
    return
  } else {

    const plainObject = {
      name: req.body.name,
      botType: req.body.botType,
      workDone: req.body.workDone,
      attack: req.body.attack,
      defense: req.body.defense,
      speed: req.body.speed,
    }

    // const encryptObject = {}

    // const made = plainObject.reduce((prev, curr, index, obj) => {
    //   curr[obj[index]] = obj[index]
    // }, {})

    const encryptName = await bcrypt.hash(req.body.name, saltRounds)
    const compare = await bcrypt.compare(req.body.name, encryptName)

    if (!compare) {
      console.log("NO MATCH: Encrypted name and plaintext name")
    } else {
      console.log("MATCH: Encrypted name and plaintext name")
    }

    db.Bot.create({
      name: encryptName,
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
apiController.route('/bot/name').post(async (req, res) => {
  console.log("Value of req.body.name in /bot/name is: ", req.body.name)
  const encryptName = await bcrypt.hash(req.body.name, saltRounds)
  const compare = await bcrypt.compare(req.body.name, encryptName)

  if (!compare) {
    console.log("NO MATCH: New name added to database!")
  } else {
    console.log("MATCH: Name already used! Choose another!")
  }

  db.Bot.findOne({
    where: {
      name: encryptName,
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
