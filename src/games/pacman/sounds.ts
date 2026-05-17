// Procedural retro sound effects for the Pac-Man game.
// Uses WebAudio so no binary assets need to be shipped.

let ctx: AudioContext | null = null;
let muted = false;

const getCtx = (): AudioContext | null => {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
};

type Tone = {
  freq: number;
  dur: number;
  type?: OscillatorType;
  vol?: number;
  slideTo?: number;
};

const playSequence = (tones: Tone[]) => {
  if (muted) return;
  const ac = getCtx();
  if (!ac) return;
  let t = ac.currentTime;
  const master = ac.createGain();
  master.gain.value = 0.18;
  master.connect(ac.destination);
  for (const tone of tones) {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = tone.type ?? "square";
    osc.frequency.setValueAtTime(tone.freq, t);
    if (tone.slideTo != null) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(40, tone.slideTo), t + tone.dur);
    }
    const v = tone.vol ?? 1;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(v, t + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + tone.dur);
    osc.connect(gain).connect(master);
    osc.start(t);
    osc.stop(t + tone.dur + 0.02);
    t += tone.dur;
  }
};

let chompToggle = false;
export const sfx = {
  setMuted(v: boolean) {
    muted = v;
  },
  isMuted() {
    return muted;
  },
  // Resume audio on first user gesture (browsers require this).
  unlock() {
    getCtx();
  },
  chomp() {
    chompToggle = !chompToggle;
    playSequence([{ freq: chompToggle ? 520 : 380, dur: 0.06, type: "square", vol: 0.6 }]);
  },
  powerPellet() {
    playSequence([
      { freq: 220, dur: 0.08, type: "square", vol: 0.8 },
      { freq: 330, dur: 0.08, type: "square", vol: 0.8 },
      { freq: 440, dur: 0.1, type: "square", vol: 0.8 },
    ]);
  },
  eatGhost() {
    playSequence([
      { freq: 880, dur: 0.06, type: "sawtooth", vol: 0.9, slideTo: 1600 },
      { freq: 1600, dur: 0.08, type: "sawtooth", vol: 0.9, slideTo: 400 },
    ]);
  },
  eatCherry() {
    playSequence([
      { freq: 660, dur: 0.07, type: "triangle", vol: 0.9 },
      { freq: 990, dur: 0.07, type: "triangle", vol: 0.9 },
      { freq: 1320, dur: 0.1, type: "triangle", vol: 0.9 },
    ]);
  },
  death() {
    playSequence([
      { freq: 660, dur: 0.18, type: "square", vol: 0.9, slideTo: 110 },
      { freq: 440, dur: 0.18, type: "square", vol: 0.9, slideTo: 80 },
      { freq: 220, dur: 0.25, type: "square", vol: 0.9, slideTo: 55 },
    ]);
  },
  levelUp() {
    playSequence([
      { freq: 523, dur: 0.1, type: "square", vol: 0.9 },
      { freq: 659, dur: 0.1, type: "square", vol: 0.9 },
      { freq: 784, dur: 0.1, type: "square", vol: 0.9 },
      { freq: 1046, dur: 0.18, type: "square", vol: 0.9 },
    ]);
  },
  start() {
    playSequence([
      { freq: 392, dur: 0.12, type: "square", vol: 0.9 },
      { freq: 523, dur: 0.12, type: "square", vol: 0.9 },
      { freq: 659, dur: 0.18, type: "square", vol: 0.9 },
    ]);
  },
  gameOver() {
    playSequence([
      { freq: 392, dur: 0.18, type: "square", vol: 0.9 },
      { freq: 311, dur: 0.18, type: "square", vol: 0.9 },
      { freq: 247, dur: 0.28, type: "square", vol: 0.9, slideTo: 100 },
    ]);
  },
};
