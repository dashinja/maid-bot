export default class Destroyer {
  constructor(name, type) {
    this.name = name
    this.type = type
    this.health = 50000
    this.attack = 9000
    this.defense = this.attack / 2
    this.speed = this.defense / 50
  }

  /////////////////////////////////
  // Inside Chore Methods: Short //
  /////////////////////////////////
  bakeSomeCookies() {
    return {
      description: `${this.name} the ${this.type} is baking cookies.`,
      eta: 8000,
      name: 'Bake Cookies',
    }
  }

  doTheDishes() {
    return {
      description: `${this.name} the ${this.type} is doing the dishes.`,
      eta: 5000,
      name: 'Dishes',
    }
  }

  doTheLaundry() {
    return {
      description: `${this.name} the ${this.type} is taking out the laundry.`,
      eta: 10000,
      name: 'Laundry',
    }
  }

  makeASammich() {
    return {
      description: `${this.name} the ${this.type} is making a yummy sammich!`,
      eta: 7000,
      name: 'Make Sandwhich',
    }
  }

  sweepTheHouse() {
    return {
      description: `${this.name} the ${this.type} is sweeping the house`,
      eta: 3000,
    }
  }

  /////////////////////////////////
  // Outside Chore Methods: Long //
  /////////////////////////////////
  giveTheDogABath() {
    return {
      description: `${this.name} the ${this.type} is giving the dog a bath.`,
      eta: 14500,
      name: 'Bathe Dog',
    }
  }

  mowTheLawn() {
    return {
      description: `${this.name} the ${this.type} is mowing the lawn.`,
      eta: 20000,
    }
  }

  rakeTheLeaves() {
    return {
      description: `${this.name} the ${this.type} is raking the leaves!`,
      eta: 18000,
    }
  }

  takeOutTheRecycling() {
    return {
      description: `${this.name} the ${this.type} is taking out the recycling `,
      eta: 4000,
    }
  }

  washTheCar() {
    return {
      description: `${this.name} the ${this.type} is washing the car!`,
      eta: 20000,
    }
  }

  ///////////////////////////////
  // Drill and Defense Methods //
  ///////////////////////////////
  attackValue() {
    return {
      description: `${this.name} is attacking!`,
      attack: 10000,
      eta: 3000,
      name: 'Attack',
    }
  }

  defenseValue() {
    let defense = this.attackValue().attack / 2
    return {
      defense,
      eta: 3500,
      description: `${
        this.name
      } is defending like Optimus. Flexin' like a Prime!`,
      name: 'Defense',
    }
  }

  healthValue() {
    let health = this.health
    this.health = health
    return health
  }

  speedValue() {
    let speed = this.defenseValue().defense / 50
    return {
      speed,
      eta: 2000,
    }
  }

  stats() {
    return {
      description: `Health: ${this.healthValue()} Attack: ${
        this.attackValue().attack
      } Defense: ${this.defenseValue().defense} Speed: ${
        this.speedValue().speed
      }`,
      health:
        this.health >= 0
          ? `${this.name}'s health is ${this.health}.`
          : `${this.name} is defeated!`,
      eta: 1000,
    }
  }
}
