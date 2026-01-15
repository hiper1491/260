/* ======================================================
   Audio Core — shared by all rooms
   Goals:
   - Avoid mechanical 432Hz (soft fade-in, optional overtone)
   - Bowl should be audible
   - Crystal should not pierce
   - Forest should not be pure hiss (filtered + slow modulation)
   - Provide fadeDown for silence ritual
   ====================================================== */

let ctx = null;
let master = null;
let nodes = [];

function ensure() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();

    // Master gain
    master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);

    // Note: You can add compressor later if needed.
  }
  if (ctx.state === "suspended") ctx.resume();
}

function clearNodes() {
  try {
    nodes.forEach(n => {
      try { n.stop && n.stop(); } catch {}
      try { n.disconnect && n.disconnect(); } catch {}
    });
  } catch {}
  nodes = [];
}

export function stopAudio() {
  ensure();
  clearNodes();
}

export function fadeTo(value = 0.0001, seconds = 2.0) {
  ensure();
  const now = ctx.currentTime;
  master.gain.cancelScheduledValues(now);
  master.gain.setValueAtTime(master.gain.value, now);
  master.gain.linearRampToValueAtTime(value, now + seconds);
}

export function fadeUp(seconds = 1.8, target = 0.05) {
  fadeTo(target, seconds);
}

export function fadeDown(seconds = 4.0) {
  fadeTo(0.0001, seconds);
}

/* ---------- Modes ---------- */

export function play432() {
  ensure();
  clearNodes();

  // Fundamental + very soft overtone
  const o1 = ctx.createOscillator();
  const o2 = ctx.createOscillator();
  o1.type = "sine";
  o2.type = "sine";
  o1.frequency.value = 432;
  o2.frequency.value = 864;

  const g1 = ctx.createGain();
  const g2 = ctx.createGain();
  g1.gain.value = 0.70;
  g2.gain.value = 0.18;

  o1.connect(g1); o2.connect(g2);
  g1.connect(master); g2.connect(master);

  o1.start(); o2.start();
  nodes.push(o1, o2, g1, g2);

  fadeUp(2.2, 0.05);
}

export function playBowl() {
  ensure();
  clearNodes();

  // Two close sines create beating (audible bowl-like)
  const o1 = ctx.createOscillator();
  const o2 = ctx.createOscillator();
  o1.type = "sine";
  o2.type = "sine";
  o1.frequency.value = 146.8;
  o2.frequency.value = 148.2;

  const g = ctx.createGain();
  g.gain.value = 0.8;

  const lowpass = ctx.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.value = 520;

  o1.connect(g); o2.connect(g);
  g.connect(lowpass);
  lowpass.connect(master);

  o1.start(); o2.start();
  nodes.push(o1, o2, g, lowpass);

  fadeUp(2.0, 0.05);
}

export function playCrystal() {
  ensure();
  clearNodes();

  // Softer crystal: triangle + gentle tremolo
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.value = 528;

  const trem = ctx.createOscillator();
  trem.type = "sine";
  trem.frequency.value = 5.4;

  const tremGain = ctx.createGain();
  tremGain.gain.value = 0.012;

  const out = ctx.createGain();
  out.gain.value = 0.55;

  trem.connect(tremGain);
  tremGain.connect(out.gain);
  osc.connect(out);
  out.connect(master);

  osc.start(); trem.start();
  nodes.push(osc, trem, tremGain, out);

  fadeUp(2.0, 0.045);
}

export function playForest() {
  ensure();
  clearNodes();

  // Filtered noise with slow modulation, less hiss
  const bufferSize = 2 * ctx.sampleRate;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.5;

  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer;
  src.loop = true;

  const band = ctx.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.value = 420;
  band.Q.value = 0.9;

  const low = ctx.createBiquadFilter();
  low.type = "lowpass";
  low.frequency.value = 1600;

  const g = ctx.createGain();
  g.gain.value = 0.55;

  // Slow LFO for flow feel
  const lfo = ctx.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 0.18;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.12;

  lfo.connect(lfoGain);
  lfoGain.connect(g.gain);

  src.connect(band);
  band.connect(low);
  low.connect(g);
  g.connect(master);

  src.start();
  lfo.start();
  nodes.push(src, band, low, g, lfo, lfoGain);

  fadeUp(2.0, 0.045);
}

/**
 * Unified entry: play by mode string
 * mode: "mute" | "432" | "bowl" | "crystal" | "forest"
 */
export function play(mode) {
  if (!mode || mode === "mute") {
    ensure();
    clearNodes();
    fadeDown(0.6);
    return;
  }
  if (mode === "432") return play432();
  if (mode === "bowl") return playBowl();
  if (mode === "crystal") return playCrystal();
  if (mode === "forest") return playForest();
}
