import "./scss/main.scss";

const summer = document.querySelector(".summer .card") as HTMLElement;
const fall = document.querySelector(".fall .card") as HTMLElement;
const winter = document.querySelector(".winter .card") as HTMLElement;

const weatherCards = document.querySelectorAll(".card");

const range = document.querySelector(".inp") as HTMLInputElement;

const birdsSound = new Audio(
  "./../assets/sounds/summer.mp3"
) as HTMLMediaElement;
const rainSound = new Audio("./../assets/sounds/rain.mp3") as HTMLMediaElement;
const blizzardSound = new Audio(
  "./../assets/sounds/winter.mp3"
) as HTMLMediaElement;

interface CardSounds {
  label: string;
  value: HTMLMediaElement;
}

const sounds: CardSounds[] = [
  {
    label: "sun",
    value: birdsSound,
  },
  {
    label: "rain",
    value: rainSound,
  },
  {
    label: "winter",
    value: blizzardSound,
  },
];

let isSound = false;

function addClassPause(card: HTMLElement) {
  if (isSound) {
    card.classList.add("pause");
    card.classList.add("active");
  }
}
function removeIcon(): void {
  weatherCards.forEach((card) => {
    card.classList.remove("pause");
    card.classList.remove("active");
  });
}

function addSound(card: string) {
  const weatherSounds = sounds.find((s) => s.label === card);
  if (weatherSounds) {
    weatherSounds.value.volume = parseFloat(range.value);
    weatherSounds.value.play();
  }
}

function stopSound() {
  sounds.forEach((sound) => {
    sound.value.pause();
  });
  isSound = false;
}

function resetSound() {
  stopSound();
  sounds.forEach((sound) => {
    sound.value.currentTime = 0;
  });
}

range.addEventListener("input", () => {
  sounds.forEach((s) => {
    s.value.volume = parseFloat(range.value);
  });
});

weatherCards.forEach((card) => {
  card.addEventListener("click", function (this: HTMLElement) {
    if (this.classList.contains("pause")) {
      this.classList.remove("pause");
      return stopSound();
    }
    if (!this.classList.contains("active")) {
      resetSound();
    }

    removeIcon();
    addSound(this.dataset.card ?? "");
    addClassPause(this);
  });
});
