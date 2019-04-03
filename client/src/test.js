import Burglar from './burglar'
import { Destroyer } from './bots'

const testBot = new Destroyer('Mario', 'Bipedal')
const testBurgler = new Burglar()

console.log(testBot.health)
console.log(testBot.attackValue().attack)
// console.log(testBurgler)
testBurgler.attackValue(testBot)
testBurgler.attackValue(testBot)
testBurgler.attackValue(testBot)
testBurgler.attackValue(testBot)
testBurgler.attackValue(testBot)
testBurgler.attackValue(testBot)
testBurgler.attackValue(testBot)
testBurgler.attackValue(testBot)
console.log(testBurgler.stats())
testBurgler.attackValue(testBot)
console.log(testBurgler.stats())
console.log(testBot.stats().health)
