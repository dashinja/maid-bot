'use strict'
// Constants
const express = require('express')
const path = require('path')
const db = require('./models')
const apiController = require('./controllers/apiController')

const PORT = process.env.PORT || 3001
const cors = require('cors')
const app = express()

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   next()
// })

// app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', apiController)
app.use(express.static(path.join(__dirname, '../client/build')))

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Listening on port:${PORT}`))
})
