export default class Burglar {
  constructor() {
    this.name = 'Burglar'
    this.health = 35000
    this.attack = 7000
  }

  attackValue(victim) {
    if (this.health < 9000) {
      // this.setState({winner: victim.name})
      console.log(`${this.name} is defeated! ${victim.name} wins!`)
      return victim.name
    } else if (
      victim.health > 0 &&
      victim.health - this.attack > 0 &&
      this.health >= 9000
    ) {
      
      victim.health = victim.health - (this.attack * Math.random())
      this.health = this.health - (victim.attack * Math.random())
      console.log(`${victim.name} has ${victim.health} health.`)
      console.log(`$The ${this.name} has ${this.health} health.`)
     this.attackValue(victim) 
    } else {
      // this.setState({winner: this.name})
      console.log(`${victim.name} is defeated! ${this.name} wins!`)
      return this.name
    }

    // return {
    //   description: `Burgler is attacking! ${
    //     bot.name
    //   }'s health is now ${bot.health}.`,
    //   attack,
    //   eta,
    //   name: 'Attack',
    // }
  }

  stats() {
    return console.log(`${this.name} has health of ${this.health}.`)
  }
}
