// Simplificacion pero con Transport

import * as Tone from 'tone';

// 1. Inicialización de Tone.js
// Tone.start() ahora se encarga de iniciar el contexto de audio y el sistema de tiempo interno.
document.getElementById('start')
.addEventListener(
  'click', 
  () => {

    
    Tone.start();
  }
);

// 2. Efectos Globales y Envío (Sends)
const globalReverb = new Tone.Reverb({
  decay: 6,
  preDelay: 0.05,
  wet: 0.4
}).toDestination();

const globalDelay = new Tone.FeedbackDelay({
  delayTime: '8n.',
  feedback: 0.6,
  wet: 0.3
}).connect(globalReverb);

const globalPhaser = new Tone.Phaser({
  frequency: 15,
  octaves: 5,
  baseFrequency: 300,
  wet: 0.5
}).connect(globalDelay);

const modBus = new Tone.Gain(0.8).connect(globalPhaser);

// 3. Generadores de Sonido (Sintetizadores)
const fmSynth = new Tone.FMSynth({
  harmonicity: 3.0,
  modulationIndex: 10,
  envelope: {
    attack: 4,
    decay: 2,
    sustain: 0.5,
    release: 5
  },
  modulationEnvelope: {
    attack: 0.5,
    decay: 0.1,
    sustain: 1,
    release: 0.5
  },
  oscillator: {
    type: 'sine'
  },
  modulation: {
    type: 'sine'
  }
}).connect(modBus);

const noiseSynth = new Tone.NoiseSynth({
  noise: {
    type: 'pink'
  },
  envelope: {
    attack: 0.1,
    decay: 1,
    sustain: 0.0,
    release: 2
  }
}).connect(globalReverb);

const pluckSynth = new Tone.PluckSynth({
  attackNoise: 1,
  resonance: 0.9,
  dampening: 1000
}).connect(modBus);

// 5. Secuenciadores y Eventos para Disparar Sonidos
// Estos se inician a sí mismos en relación con el sistema de tiempo general de Tone.js
const fmPart = new Tone.Part(
  (time, value) => {
    fmSynth.triggerAttackRelease(value.note, value.duration, time);
  },
  [
    { time: 0, note: 'C3', duration: 8 },
    { time: 8, note: 'G3', duration: 10 },
    { time: 18, note: 'Bb2', duration: 12 },
    { time: 30, note: 'F3', duration: 15 }
  ]
).start(0);
fmPart.loop = true;
fmPart.loopEnd = '45s';
fmPart.start(0);

const noiseLoop = new Tone.Loop(
  time => {
    noiseSynth.triggerAttackRelease(Math.random() * 0.5 + 0.1, time);
  },
  '4n'
);
noiseLoop.probability = 0.3;
noiseLoop.start(0);

const pluckLoop = new Tone.Loop(
  time => {
    const randomMidiNote = Math.random() * 48 + 36;
    pluckSynth.triggerAttackRelease(
      Tone.Frequency(randomMidiNote, "midi"),
      0.2,
      time
    );
  },
  '2n'
);
pluckLoop.probability = 0.15;
pluckLoop.start(0);

// 6. Controles Interactivos (Ejemplo Básico)
window.setReverbWet = (value) => {
  globalReverb.wet.value = value;
};

console.log("Configuración de ambiente sonoro abstracto cargada y lista para sonar al primer clic.");
console.log("Asegúrate de que el navegador no bloquee el audio automático.");

Tone.Transport.start();

// Ya no necesitamos Tone.Transport.start() aquí.
// Los loops y partes se activarán con el Tone.start() inicial.