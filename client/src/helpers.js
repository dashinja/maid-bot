import { CONSTANTS } from './constants'

export function createValidation(stage, state) {
  console.log('stage at start:', stage)
  console.log('state at start:', state)
  let noNameCount = stage
  let botNameState = state
  console.log('noNameCount at start:', noNameCount)
  const speak = {
    and: function(text) {
      window.responsiveVoice.speak(text, 'UK English Female', {
        pitch: 1,
        volume: 1,
      })
    },
  }

  console.log('noNameCount before BIG if:', noNameCount)
  if (noNameCount > 9) {
    noNameCount = 0
  }

  console.log('noNameCount before if botNameState:', noNameCount)
  if (botNameState === '') {
    if (noNameCount === 0) {
      speak.and(CONSTANTS.SPEECH.CREATE.ERROR[0])
      noNameCount += 1
      console.log("I'm noNameCount within first condition", noNameCount)
      console.log('botNameState:', botNameState)
      console.error('Must enter a Robot Name!')
    } else if (noNameCount === 1) {
      noNameCount += 1
      speak.and(CONSTANTS.SPEECH.CREATE.ERROR[1])
      console.log("I'm noNameCount:", noNameCount)
      return console.error('Must enter a Robot Name!')
    } else if (noNameCount === 2) {
      noNameCount += 1
      speak.and(CONSTANTS.SPEECH.CREATE.ERROR[3])
      console.log("I'm noNameCount:", noNameCount)
      return console.error('Must enter a Robot Name!')
    } else if (noNameCount === 3) {
      noNameCount += 1
      speak.and(CONSTANTS.SPEECH.CREATE.ERROR[4])
    } else if (noNameCount === 4) {
      noNameCount += 1
      speak.and(CONSTANTS.SPEECH.CREATE.ERROR[5])
    } else if (noNameCount === 5) {
      speak.and(CONSTANTS.SPEECH.CREATE.ERROR[6])
    }
  } else {
    console.log("I'm noNameCount:", noNameCount)
    if (noNameCount > 5 && noNameCount < 10) {
      noNameCount = 5
    }
    if (noNameCount >= 1 && noNameCount <= 5) {
      speak.and(CONSTANTS.SPEECH.CREATE.ALT[0])
      speak.and(`${botNameState} you call it?`)
      speak.and(CONSTANTS.SPEECH.CREATE.ALT[1])
      speak.and(CONSTANTS.SPEECH.CREATE.ALT[2])
      noNameCount += 10
      console.log("I'm noNameCount:", noNameCount)
      setTimeout(() => {
        speak.and(CONSTANTS.SPEECH.CREATE.ALT[3])
      }, 20000)
      setTimeout(() => {
        speak.and(CONSTANTS.SPEECH.CREATE.ALT[4])
      }, 25000)
      setTimeout(() => {
        window.responsiveVoice.speak(
          CONSTANTS.SPEECH.CREATE.ALT[5],
          'UK English Female',
          {
            pitch: 1,
            volume: 0.45,
            rate: 1.1,
          },
        )
      }, 28000)
    } else if (noNameCount < 1) {
      speak.and(
        `Well well then. ${botNameState}, ahah? - I see... - How unique of you`,
      )
      speak.and(CONSTANTS.SPEECH.CREATE.NORMAL[0])
      noNameCount += 10
      console.log("I'm noNameCount:", noNameCount)
      setTimeout(() => {
        speak.and(CONSTANTS.SPEECH.CREATE.NORMAL[1])
      }, 10500)
      setTimeout(() => {
        speak.and(CONSTANTS.SPEECH.CREATE.NORMAL[2])
      }, 20000)
      setTimeout(() => {
        speak.and(CONSTANTS.SPEECH.CREATE.NORMAL[3])
      }, 28000)
    }
  }
}

export function choreValidation(stage) {
  let noNameCount = stage

  const normalSpeak = {
    and: function(text) {
      window.responsiveVoice.speak(text, 'UK English Female', {
        pitch: 1,
        volume: 1,
      })
    },
  }

  if (noNameCount >= 14 && noNameCount <= 16) {
    normalSpeak.and(CONSTANTS.SPEECH.CHORES.GEAR)
    setTimeout(() => {
      normalSpeak.and(CONSTANTS.SPEECH.CHORES.PROTECT)
    }, 8000)
    return (noNameCount += 1)
  } else if (noNameCount >= 17 && noNameCount < 18) {
    normalSpeak.and(CONSTANTS.SPEECH.CHORES.YEAH)
    return (noNameCount += 1)
  } else if (noNameCount === 18) {
    normalSpeak.and(CONSTANTS.SPEECH.CHORES.COMPLY)
    return (noNameCount = 19)
  }
}
