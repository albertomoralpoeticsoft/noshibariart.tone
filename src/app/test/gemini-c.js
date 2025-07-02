import * as Tone from 'tone';

const startButton = document.getElementById('startButton');
const audioStatusDiv = document.getElementById('audioStatus');

// Un sintetizador muy simple, conectado directamente al destino.
const simpleSynth = new Tone.Synth({
  oscillator: { type: 'sine' },
  envelope: {
    attack: 0.1,
    decay: 0.2,
    sustain: 0.5,
    release: 1
  }
}).toDestination(); // Conectado directamente a la salida de audio del sistema

// Un loop que dispara una nota simple
const simpleLoop = new Tone.Loop(time => {
  simpleSynth.triggerAttackRelease('C4', '8n', time); // Reproduce C4 por una corchea
}, '1n'); // Cada nota entera (muy lento para depuración)
simpleLoop.probability = 1; // Siempre se dispara

// Función para iniciar el audio
const startAudio = async () => {
  try {
    // Inicia el contexto de audio. Esto puede requerir un await.
    await Tone.start();
    console.log("Audio Context State after Tone.start():", Tone.context.state);

    if (Tone.context.state === 'running') {
      // Si el contexto está corriendo, inicia el loop y el Transport.
      // Incluyo Tone.Transport.start() aquí para asegurar que las secuencias temporizadas
      // empiecen de forma fiable, a pesar de las advertencias de deprecación.
      Tone.Transport.start(); 
      simpleLoop.start(0); // Inicia el loop en el tiempo 0 del Transport

      startButton.style.display = 'none'; // Oculta el botón
      audioStatusDiv.textContent = 'Estado del Audio: ¡Sonando un simple C4!';
      console.log("¡Sonido simple y loop iniciado!");
      
    } else {
      audioStatusDiv.textContent = 'Estado del Audio: No se pudo iniciar (¿permisos?).';
      console.error("Tone.start() no pudo cambiar el estado a 'running'. Estado actual:", Tone.context.state);
    }
  } catch (error) {
    console.error("Error al iniciar el contexto de audio:", error);
    audioStatusDiv.textContent = 'Estado del Audio: Error al iniciar. Revisa la consola.';
  }
  // Remueve el listener para que no se intente iniciar múltiples veces.
  startButton.removeEventListener('click', startAudio); 
};

// Adjunta el evento de clic al botón
startButton.addEventListener('click', startAudio);

console.log("Configuración minimalista cargada. Haz clic en el botón para iniciar el audio.");