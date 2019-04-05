
export function choreValidation(stage) {
  let noNameCount = stage
  const normalSpeak = {
    and: function (text) {
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
    return noNameCount += 1
  } else if (noNameCount >= 17 && noNameCount < 18) {
    normalSpeak.and('Yeah..., more chores...')
    return noNameCount += 1
  } else if (noNameCount === 18) {
    normalSpeak.and("Okay... I won't complain anymore. Such is my lot!")
    return noNameCount = 19
  }
}