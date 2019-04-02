const express = require('express')
const db = require('./models')
const mainController = require('./controllers/mainController')
const apiController = require('./controllers/apiController')

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', apiController)
app.use('/', mainController)


db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Listening on port:${PORT}`))
})
