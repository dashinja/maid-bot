export default class Burglar {
  constructor() {
    this.name = 'Burglar'
    this.health = 35000
    this.attack = 7000
  }

  attackValue(victim) {
    if (this.health < 9000) {
      console.log(`${this.name} is defeated! ${victim.name} wins!`)
      return victim.name
    } else if (
      victim.health > 0 &&
      victim.health - this.attack > 0 &&
      this.health >= 9000
    ) {
      setTimeout(() => {
        victim.health = victim.health - this.attack * Math.random()
        this.health = this.health - victim.attack * Math.random()
        console.log(`${victim.name} has ${victim.health} health.`)
        console.log(`$The ${this.name} has ${this.health} health.`)
        this.attackValue(victim)
        
      }, 1500);
    } else {
      console.log(`${victim.name} is defeated! ${this.name} wins!`)
      return this.name
    }
  }

  stats() {
    return console.log(`${this.name} has health of ${this.health}.`)
  }
}
