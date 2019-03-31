const express = require('express')
const db = require('./models')
const mainController = require('./controllers/mainController')

const PORT = process.env.PORT || 3001
const app = express()

app.use('/', mainController)
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Listening on port:${PORT}`))
})
