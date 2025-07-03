import * as Tone from 'tone'

const modBus = new Tone.Gain(0.8).toDestination()

const synth = new Tone.Synth().connect(modBus)

const loop = new Tone.Loop(
  time => {
  
    synth.triggerAttackRelease('60', 0.1, time)

  }, 
  0.3
)
.start()

export const startAudio = async () => {
  
  try {

    await Tone.start()
    Tone.Transport.start()

  } catch (error) {

    console.log(error)
  }
}

export const playAudio = () => {

  Tone.Transport.start()
}

export const stopAudio = () => {

  Tone.Transport.stop()
}

export const setInterval = value => {  

  loop.interval = value
}

export const setVolume = value => {  

  modBus.gain.value = value;
}
