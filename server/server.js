const express = require('express')
const path = require('path')
const db = require('./models')
const apiController = require('./controllers/apiController')

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', apiController)
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Listening on port:${PORT}`))
})
