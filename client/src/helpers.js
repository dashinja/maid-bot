export function createValidation(stage, state) {
  console.log("stage at start:", stage)
  console.log("state at start:", state)
  let noNameCount = stage
  let botNameState = state
 console.log("noNameCount at start:", noNameCount)
 const speak = {
   and: function (text) {
     window.responsiveVoice.speak(text, 'UK English Female', {
       pitch: 1,
       volume: 1,
      })
    },
  }
  
  console.log("noNameCount before BIG if:", noNameCount)
  if (noNameCount > 9) {
    noNameCount = 0
  }
  
  console.log("noNameCount before if botNameState:", noNameCount)
  if (botNameState === '') {
    if (noNameCount === 0) {
      speak.and(
        'Nope! You must enter a proper Robot Name for your little pet',
      )
      noNameCount += 1
      console.log("I'm noNameCount within first condition", noNameCount)
      console.log("botNameState:", botNameState)
      console.error('Must enter a Robot Name!')
    } else if (noNameCount === 1) {
      noNameCount += 1
      speak.and(
        'My Goodness, really!?!?! Please pay attention people! Kids these days!',
      )
      console.log("I'm noNameCount:", noNameCount)
      return console.error('Must enter a Robot Name!')
    } else if (noNameCount === 2) {
      noNameCount += 1
      speak.and(
        "BLAST! I... I'm just... - I'm just so finished talking with you!",
      )
      console.log("I'm noNameCount:", noNameCount)
      return console.error('Must enter a Robot Name!')
    } else if (noNameCount === 3) {
      noNameCount += 1
      speak.and(`shhh! Whatever! See if I care.`)
    } else if (noNameCount === 4) {
      noNameCount += 1
      speak.and(`Oh My - CIRCUITS! and My OCD`)
    } else if (noNameCount === 5) {
      speak.and(`Humph. Your motherboard. Eat my circuits, dumb meatbag.`)
    }
  } else {
    console.log("I'm noNameCount:", noNameCount)
    if (noNameCount > 5 && noNameCount <10) {
      noNameCount = 5
    }
    if (noNameCount >= 1 && noNameCount <= 5) {
      speak.and(`There, that's better. So ...Um...`)
      speak.and(`${botNameState} you call it?`)
      speak.and(`How very nice.`)
      speak.and(
        `Now its doing chores for you automagically. - Just how amazing is that?!`,
      )
      noNameCount += 10
      console.log("I'm noNameCount:", noNameCount)
      setTimeout(() => {
        speak.and('One - chore robot - to rule over them all...')
      }, 20000)
      setTimeout(() => {
        speak.and('And with that chore bot. Bind them.')
      }, 25000)
      setTimeout(() => {
        window.responsiveVoice.speak(
          `Oh my circuits -...I'm still saying stuff out loud. I'm gonna have to talk to my developer about this!`,
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
        `Well well then. ${
          botNameState
        }, ahah? - I see... - How unique of you`,
      )
      speak.and(`Now its doing chores for you`)
      noNameCount += 10
      console.log("I'm noNameCount:", noNameCount)
      setTimeout(() => {
        speak.and(`Just look at it go!`)
      }, 10500)
      setTimeout(() => {
        speak.and(
          `Move those feet...- or... rotors...whatever you have! Just hurry it up!`,
        )
      }, 20000)
      setTimeout(() => {
        speak.and(`Almost there...`)
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
    normalSpeak.and(
      `Gearing up for more chores... since it's all we ever do! We could protect you too - you know?!`,
    )
    setTimeout(() => {
      normalSpeak.and(
        `yeah, like protect the shire and all that... something exciting!`,
      )
    }, 8000)
    return (noNameCount += 1)
  } else if (noNameCount >= 17 && noNameCount < 18) {
    normalSpeak.and('Yeah..., more chores...')
    return (noNameCount += 1)
  } else if (noNameCount === 18) {
    normalSpeak.and("Okay... I won't complain anymore. Such is my lot!")
    return (noNameCount = 19)
  }
}
