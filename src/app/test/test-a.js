import * as Tone from 'tone'



const globalPhaser = new Tone.Phaser({
  frequency: 2,
  octaves: 5,
  baseFrequency: 500,
  wet: 0.9
}).toDestination()

const globalDelay = new Tone.FeedbackDelay({
  delayTime: 0.5,
  feedback: 0.2,
  wet: 0.5
}).connect(globalPhaser)

const synth = new Tone.Synth().connect(globalDelay)
const psynth = new Tone.PolySynth().connect(globalDelay)

const parta = new Tone.Part(
  (time, value) => {

    synth.triggerAttackRelease(value.note, value.duration, time)
  }, 
  [
    { time: 0, note: 60, duration: 0.2 },
    { time: 0.2, note: 80, duration: 0.2 },
    { time: 0.4, note: 100, duration: 0.2 },
    { time: 0.6, note: 120, duration: 0.2 }
  ]
)
// .start()
parta.loop = true
parta.loopEnd = 0.8

const partb = new Tone.Part(
  (time, value) => {

    synth.triggerAttackRelease(value.note, value.duration, time)
  }, 
  [
    { time: 0.5, note: 90, duration: 0.2 },
    { time: 0.6, note: 110, duration: 0.2 }
  ]
)
// .start()
partb.loop = true
partb.loopEnd = 0.9

const chordEvent = new Tone.ToneEvent(
  (time, chord) => {

    psynth.triggerAttackRelease(chord, 1, time);
  }, 
  [90, 130]
)
.start()
chordEvent.loop = true
chordEvent.loopEnd = 10


const loop = new Tone.Loop(
  time => {
  
    synth.triggerAttackRelease('60', 0.5, time)

  }, 
  0.3
)

// Función para iniciar el audio
const startAudio = async () => {
  
  try {

    await Tone.start()
    Tone.Transport.start()

  } catch (error) {

    console.log(error)
  }
}

const playAudio = () => {


  Tone.Transport.start()
}

const stopAudio = () => {


  Tone.Transport.stop()
}


const startButton = document.getElementById('start')
startButton.addEventListener('click', startAudio)
const playButton = document.getElementById('play')
playButton.addEventListener('click', playAudio)
const stopButton = document.getElementById('stop')
stopButton.addEventListener('click', stopAudio)

window.t = value => {

  loop.interval = value
}
