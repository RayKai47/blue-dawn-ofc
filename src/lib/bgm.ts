import { BGM } from "#/constants/music";

// 全站唯一的背景音樂控制器（只在瀏覽器端使用）。
// 用 Web Audio 的 GainNode 控制音量：iOS Safari 不允許直接改 <audio>.volume，淡入淡出只能這樣做。

type Listener = () => void;

const STORAGE_KEY = "bd-bgm";
const GESTURES = ["click", "keydown", "touchend"] as const;

const listeners = new Set<Listener>();
const ducking = new Set<string>();

let audio: HTMLAudioElement | null = null;
let context: AudioContext | null = null;
let gain: GainNode | null = null;
let enabled = false;
let pauseTimer: number | undefined;

function notify() {
  listeners.forEach((listener) => listener());
}

function readPref() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writePref(value: "on" | "off") {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // 無痕模式或被封鎖時，偏好只在這次瀏覽有效
  }
}

function targetLevel() {
  return ducking.size > 0 ? 0 : BGM.volume;
}

function ramp(target: number, ms: number) {
  if (!context || !gain) return;

  const now = context.currentTime;

  gain.gain.cancelScheduledValues(now);
  gain.gain.setValueAtTime(gain.gain.value, now);
  gain.gain.linearRampToValueAtTime(target, now + ms / 1000);
}

function handleVisibility() {
  if (!audio) return;

  if (document.hidden) audio.pause();
  else if (enabled) void audio.play().catch(() => undefined);
}

function ensure() {
  if (audio && context && gain) return true;

  try {
    audio = new Audio(BGM.src);
    audio.loop = true;
    audio.preload = "auto";
    context = new AudioContext();
    gain = context.createGain();
    gain.gain.value = 0;
    context.createMediaElementSource(audio).connect(gain).connect(context.destination);
    document.addEventListener("visibilitychange", handleVisibility);

    return true;
  } catch {
    audio = null;
    context = null;
    gain = null;

    return false;
  }
}

function enable() {
  if (enabled || !ensure() || !audio || !context) return;

  enabled = true;
  window.clearTimeout(pauseTimer);
  writePref("on");
  notify();
  void context.resume();
  audio
    .play()
    .then(() => ramp(targetLevel(), BGM.fadeInMs))
    .catch(() => {
      enabled = false;
      notify();
    });
}

function disable() {
  if (!enabled) return;

  enabled = false;
  writePref("off");
  notify();
  ramp(0, BGM.fadeOutMs);
  pauseTimer = window.setTimeout(() => {
    if (!enabled) audio?.pause();
  }, BGM.fadeOutMs + 50);
}

function toggle() {
  if (enabled) disable();
  else enable();
}

// 別的功能（例如影片）要讓音樂安靜時呼叫；每個呼叫者用自己的名字，互不影響
function duck(owner: string, on: boolean) {
  if (on) ducking.add(owner);
  else ducking.delete(owner);

  if (enabled) ramp(targetLevel(), on ? BGM.duckFadeMs : BGM.restoreFadeMs);
}

// 瀏覽器不允許沒互動就出聲，所以等訪客第一次點擊／按鍵／觸控時才開始。
// 點在音樂開關上不算（那是訪客自己要決定開或關）。訪客曾經手動關掉，就不會再自動開。
function armAutoStart() {
  if (readPref() === "off") return () => undefined;

  function stop() {
    GESTURES.forEach((name) => removeEventListener(name, start, true));
  }

  function start(event: Event) {
    if (event.target instanceof Element && event.target.closest("[data-bgm-toggle]")) return;

    stop();
    enable();
  }

  GESTURES.forEach((name) => addEventListener(name, start, true));

  return stop;
}

function subscribe(listener: Listener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function isEnabled() {
  return enabled;
}

export const bgm = { armAutoStart, duck, isEnabled, subscribe, toggle };
