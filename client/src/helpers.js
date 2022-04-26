import { CONSTANTS } from './constants'


// Default Robot Commentary Setup
export const femaleDefault = {
  and: async function (text, options) {
    window.responsiveVoice.speak(text, 'UK English Female', {
      pitch: 1,
      volume: 1,
      key: "L1sSlRqo",
      ...options
    })
  },
}

// Home Defense Variation of Voice
export const femaleDefensive = {
  speak: async function (text, options) {
    window.responsiveVoice.speak(text, 'UK English Female', {
      pitch: 0.77,
      volume: 1,
      key: "L1sSlRqo",
      ...options
    })
  },
}

export const Voices = {
  femaleDefault,
  femaleDefensive
}

export const speakerHandler = async (waitTime, ttsString, speechOptions, voice = femaleDefault) => {
  return new Promise((res, rej) => {
    voice.and(ttsString, {
      speechOptions, ...{
        onend: () => setTimeout(() => {
          res("Success")
        }, waitTime * 1000),
        onerror: () => rej("Speak Handler Failed")
      }
    })
  })
}

export function createValidation(stage, state) {
  let noNameCount = stage
  let botNameState = state

  // Reset
  if (noNameCount > 9) {
    noNameCount = 0
  }

  if (botNameState === '') {

    switch (noNameCount) {
      case 0:
        noNameCount += 1
        femaleDefault.and(CONSTANTS.SPEECH.CREATE.ERROR[0])
        console.error('Must enter a Robot Name!')
        break;
      case 1:
        noNameCount += 1
        femaleDefault.and(CONSTANTS.SPEECH.CREATE.ERROR[1])
        console.error('Must enter a Robot Name!')
        break;
      case 2:
        noNameCount += 1
        femaleDefault.and(CONSTANTS.SPEECH.CREATE.ERROR[3])
        console.error('Must enter a Robot Name!')
        break;
      case 3:
        noNameCount += 1
        femaleDefault.and(CONSTANTS.SPEECH.CREATE.ERROR[4])
        console.error('Must enter a Robot Name!')
        break;
      case 4:
        noNameCount += 1
        femaleDefault.and(CONSTANTS.SPEECH.CREATE.ERROR[5])
        console.error('Must enter a Robot Name!')
        break;

      default:
        break;
    }
  } else {
    if (noNameCount > 5 && noNameCount < 10) {
      noNameCount = 5
    }
    if (noNameCount >= 1 && noNameCount <= 5) {
      speakerHandler(0, CONSTANTS.SPEECH.CREATE.ALT[0])
        .then(() => speakerHandler(1, `${botNameState} you call it?`))
        .then(() => speakerHandler(1, CONSTANTS.SPEECH.CREATE.ALT[1]))
        .then(() => speakerHandler(1, CONSTANTS.SPEECH.CREATE.ALT[2]))
        .then(() => noNameCount += 10)
        .then(() => speakerHandler(4, CONSTANTS.SPEECH.CREATE.ALT[3]))
        .then(() => speakerHandler(0, CONSTANTS.SPEECH.CREATE.ALT[4]))
        .then(() => speakerHandler(3, CONSTANTS.SPEECH.CREATE.ALT[5]))
        .catch(error => console.error(error))

    } else if (noNameCount < 1) {
      const uniquteText = `Well well then. ${botNameState}, ahah? - I see... - How unique of you`

      speakerHandler(0, uniquteText)
        .then(() => {
          noNameCount += 10
          speakerHandler(7, CONSTANTS.SPEECH.CREATE.NORMAL[0])
        })
        .then(() => speakerHandler(10.5, CONSTANTS.SPEECH.CREATE.NORMAL[1]))
        .then(() => speakerHandler(9.5, CONSTANTS.SPEECH.CREATE.NORMAL[2]))
        .then(() => speakerHandler(6, CONSTANTS.SPEECH.CREATE.NORMAL[3]))
    }
  }
}

export function choreSequence(stage) {
  let noNameCount = stage

  if (noNameCount >= 14 && noNameCount <= 16) {
    speakerHandler(0, CONSTANTS.SPEECH.CHORES.GEAR)
      .then(() => { speakerHandler(8, CONSTANTS.SPEECH.CHORES.PROTECT); return (noNameCount += 1) })
  } else if (noNameCount >= 17 && noNameCount < 18) {
    speakerHandler(0, CONSTANTS.SPEECH.CHORES.YEAH)
      .then(() => noNameCount += 1)
  } else if (noNameCount === 18) {
    speakerHandler(0, CONSTANTS.SPEECH.CHORES.COMPLY)
      .then(() => noNameCount = 19)

  }
}




