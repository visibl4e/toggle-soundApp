import "./scss/main.scss";

const summer = document.querySelector(".summer") as HTMLElement;
const fall = document.querySelector(".fall") as HTMLElement;
const winter = document.querySelector(".winter") as HTMLElement;

const weatherCards = document.querySelectorAll(".card");

const range = document.querySelector(".inputRange") as HTMLInputElement;

const birdsSound = new Audio("./../assets/sounds/summer.mp3");
const rainSound = new Audio("./../assets/sounds/rain.mp3");
const blizzardSound = new Audio("./../assets/sounds/winter.mp3");

interface CardSounds {
  key: string;
  value: HTMLAudioElement;
}

const sounds: CardSounds[] = [
  {
    key: "sun",
    value: birdsSound,
  },
  {
    key: "rain",
    value: rainSound,
  },
  {
    key: "winter",
    value: blizzardSound,
  },
];

let isPlaySound: boolean = false;

function addIcon(card: HTMLElement) {
  if (isPlaySound) {
    card.classList.add("pause");
    card.classList.add("active");
  }
}

function playSounds(card: string) {
  const weather = sounds.find((sound) => sound.key === card);

  if (weather) {
    weather.value.volume = parseFloat(range.value);
    weather.value.play();
  }

  isPlaySound = true;
}

function stopSound() {
  sounds.forEach((sound) => sound.value.pause());
  isPlaySound = false;
}
//
// stop playong sound
function stopPlayingSound() {
  stopSound();
  sounds.forEach((sound) => {
    sound.value.currentTime = 0;
  });
}

weatherCards.forEach((card) => {
  card.addEventListener("click", () => {
    isPlaySound = false;
  });
});

function removeIcon() {
  weatherCards.forEach((card) => {
    card.classList.remove("pause");
    card.classList.remove("active");
  });
}

//
//
//
//
//

weatherCards.forEach((card) => {
  card.addEventListener("click", function (this: HTMLElement) {
    if (this.classList.contains("pause")) {
      this.classList.remove("pause");
      return stopSound();
    }

    if (!this.classList.contains("active")) {
      stopPlayingSound();
    }

    removeIcon();
    playSounds(this.dataset.card ?? "");
    addIcon(this);
  });
});

range.addEventListener("input", () => {
  sounds.forEach((sound) => {
    sound.value.volume = parseFloat(range.value);
  });
});
