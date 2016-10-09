const
  $screen = document.querySelector('.preload-screen'),
  resource = {
    audios: [
      'audio/dark_ambient.mp3',
      'audio/audio_sprite.mp3'
    ],
    images: [
      // 'image/sprite.png' # брауз сразу запрашивает
    ]
  };

const winWidth = window.innerWidth;
let preloadImageForestNight = 'image/forest_night_mobile.jpg';

if (winWidth >= 544 && winWidth <= 992) {
  preloadImageForestNight = 'image/forest_night_tablet.jpg';
} else if (winWidth > 992) {
  preloadImageForestNight = 'image/forest_night.jpg';
}

resource.images.push(preloadImageForestNight);

resourcePreload();

function resourcePreload() {
  preparationAudios();
  preparationImages();
}

function preparationAudios() {
  resource.audios.forEach(audioSrc => {
    new Audio(audioSrc);
  });
}

function preparationImages() {
  resource.images.forEach(imageSrc => {
    new Image(imageSrc);
  });
}

function load() {
  window.removeEventListener('load', load);
  $screen.style.opacity = 0;

  setTimeout(() => {
    $screen.remove();
  }, 500);
}

window.addEventListener('load', load);
