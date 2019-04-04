export default class Burglar {
  constructor() {
    this.name = 'Burglar'
    this.health = 35000
    this.attack = 7000
  }

  attackValue(victim) {
    if (this.health < 9000) {
      console.log(`${this.name} is defeated! ${victim.name} wins!`)
      setTimeout(() => {
        window.responsiveVoice.speak(
          `${this.name} is defeated! ${victim.name} wins!`,
        )
      }, 6000)
      return victim.name
    } else if (
      victim.health > 0 &&
      victim.health - this.attack > 0 &&
      this.health >= 9000
    ) {
      victim.health = victim.health - this.attack * Math.random()
      this.health = this.health - victim.attack * Math.random()
      console.log(`${victim.name} has ${victim.health} health.`)
      console.log(`$The ${this.name} has ${this.health} health.`)
      return this.attackValue(victim)
    } else {
      console.log(`${victim.name} is defeated! ${this.name} wins!`)
      setTimeout(() => {
        window.responsiveVoice.speak(
          `Welp - the ${
            this.name
          } won! Now your master's house will get looted. Like, do you even turing? - What a Piece of Junk!`,
        )
      }, 6000)

      return this.name
    }
  }

  stats() {
    return console.log(`${this.name} has health of ${this.health}.`)
  }
}
