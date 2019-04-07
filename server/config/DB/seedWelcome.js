const fs = require('fs')
const db = require('../../models')

fs.readFile('./welcome.csv', 'utf8', (err, data) => {
  let createdModels = []
  const allData = data.split('\n')

  createdModels.push(
    db.Welcome.create({
      welcome: JSON.stringify(allData),
    }),
  )
  Promise.all(createdModels).then(() => {
    process.exit()
  })
})
