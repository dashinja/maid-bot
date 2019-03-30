export const selectChores = (first, second, bot) => {
  const randChoice = () => Math.random()
  randChoice() > 0.2 ? executioner(first, bot) : executioner(second, bot)
}

export const executioner = (array, bot) => {
  if (array[0] && bot[array[0]]) {
    console.log('\n', bot[array[0]]().description)
    setTimeout(() => {
      console.log(`\n${bot.name} Finished the Task`)
      let nextArray = array.slice(1)
      console.log('Remaining Tasks:', nextArray)
      executioner(nextArray, bot)
    }, bot[array[0]]().eta)
  } else console.log('All Tasks Complete!')
}



export class Destroyer {
  constructor(name, type) {
    this.name = name
    this.type = type
    console.log(`\n${this.name}, the ${this.type} Destroyer is Born! Tremble!`)
  }

  attackValue() {
    return {
      description: `${this.name} is attacking!`,
      attack: 10000,
      eta: 2000,
    }
  }

  bakeSomeCookies() {
    return {
      description: `${this.name} is baking cookies.`,
      eta: 8000,
    }
  }

  defenseValue() {
    let defense = this.attackValue().attack / 2
    return {
      defense,
      eta: 1000,
    }
  }

  doTheDishes() {
    return {
      description: `${this.name} is doing the dishes.`,
      eta: 5000,
    }
  }

  doTheLaundry() {
    return {
      description: `${this.name} is taking out the laundry.`,
      eta: 10000,
    }
  }

  executioner (array, bot) {
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
    }
  }

  healthValue() {
    let health = 40000
    return health
  }

  makeASammich() {
    return {
      description: `${this.name} is making a yummy sammich!`,
      eta: 7000,
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

  selectChores (first, second, bot) {
    const randChoice = () => Math.random()
    randChoice() > 0.2 ? this.executioner(first, bot) : this.executioner(second, bot)
  }

  speedValue() {
    let speed = this.defenseValue().defense / 50
    return {
      speed,
      eta: 2000,
    }
  }

  stats() {
    console.log(
      `\nHealth: ${this.healthValue()} \nAttack: ${
      this.attackValue().attack
      } \nDefense: ${this.defenseValue().defense} \nSpeed: ${
      this.speedValue().speed
      }`,
    )
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




