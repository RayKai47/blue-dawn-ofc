// 背景音樂設定。音量是 0~1 的增益，這首原曲偏大聲（約 -13 LUFS），0.3 約降低 10 dB，當作底景剛好。
export const BGM = {
  src: "/music/blue-dawn.mp3",
  volume: 0.3,
  fadeInMs: 2500,
  fadeOutMs: 700,
  // 影片開始出聲時，音樂淡出的時間；影片停下來後，音樂慢慢回來的時間
  duckFadeMs: 900,
  restoreFadeMs: 2200,
};
