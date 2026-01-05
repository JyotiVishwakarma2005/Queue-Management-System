let audio = null;

export const initNotificationSound = () => {
  if (!audio) {
    audio = new Audio("/preview.mp3");
    audio.volume = 0.7;
  }
};

export const playNotificationSound = () => {
  if (!audio) return;
  audio.currentTime = 0;
  audio.play().catch(() => {});
};
