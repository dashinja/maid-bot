// export const selectChores = (first, second, bot) => {
//   const randChoice = () => Math.random()
//   randChoice() > 0.2 ? executioner(first, bot) : executioner(second, bot)
// }

// export const executioner = (array, bot) => {
//   if (array[0] && bot[array[0]]) {
//     console.log('\n', bot[array[0]]().description)
//     setTimeout(() => {
//       console.log(`\n${bot.name} Finished the Task`)
//       let nextArray = array.slice(1)
//       console.log('Remaining Tasks:', nextArray)
//       executioner(nextArray, bot)
//     }, bot[array[0]]().eta)
//   } else console.log('All Tasks Complete!')
// }

export class Destroyer {
  constructor(name, type) {
    this.name = name
    this.type = type
    this.health = 50000
    this.attack = 9000
    this.defense = this.attack / 2
    this.speed = this.defense / 50

    console.log(`\n${this.name}, the ${this.type} Destroyer is Born! Tremble!`)
  }

  attackValue() {

    return {
      description: `${this.name} is attacking!`,
      attack: 10000,
      eta: 3000,
      name: 'Attack',
    }
  }

  bakeSomeCookies() {
    return {
      description: `${this.name} is baking cookies.`,
      eta: 8000,
      name: 'Bake Cookies',
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

  doTheDishes() {
    return {
      description: `${this.name} is doing the dishes.`,
      eta: 5000,
      name: 'Dishes',
    }
  }

  doTheLaundry() {
    return {
      description: `${this.name} is taking out the laundry.`,
      eta: 10000,
      name: 'Laundry',
    }
  }

  executioner(array, bot) {
    if (array[0] && bot[array[0]]) {
      console.log('\n', bot[array[0]]().description)
      setTimeout(() => {
        console.log(`\n${bot.name} Finished the Task`)
        let nextArray = array.slice(1)
        console.log('Remaining Tasks:', nextArray)
        this.executioner(nextArray, bot)
      }, bot[array[0]]().eta)
    } else console.log('All Tasks Complete!')
  }

  giveTheDogABath() {
    return {
      description: `${this.name} is giving the dog a bath.`,
      eta: 14500,
      name: 'Bathe Dog',
    }
  }

  healthValue() {
    let health = this.health
    this.health = health
    return health
  }

  makeASammich() {
    return {
      description: `${this.name} is making a yummy sammich!`,
      eta: 7000,
      name: 'Make Sandwhich',
    }
  }

  mowTheLawn() {
    return {
      description: `${this.name} is mowing the lawn.`,
      eta: 20000,
    }
  }

  rakeTheLeaves() {
    return {
      description: `${this.name} is raking the leaves!`,
      eta: 18000,
    }
  }

  selectChores(first, second, bot) {
    const randChoice = () => Math.random()
    randChoice() > 0.2
      ? this.executioner(first, bot)
      : this.executioner(second, bot)
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
      description: ` \nHealth: ${this.healthValue()} \nAttack: ${
        this.attackValue().attack
      } \nDefense: ${this.defenseValue().defense} \nSpeed: ${
        this.speedValue().speed
      }`,
      health: this.health >= 0 ? `${this.name}'s health is ${this.health}.` : `${this.name} is defeated!`,
    }
  }

  sweepTheHouse() {
    return {
      description: `${this.name} is sweeping the house`,
      eta: 3000,
    }
  }

  takeOutTheRecycling() {
    return {
      description: `${this.name} is taking out the recycling `,
      eta: 4000,
    }
  }

  washTheCar() {
    return {
      description: `${this.name} is washing the car!`,
      eta: 20000,
    }
  }
}
