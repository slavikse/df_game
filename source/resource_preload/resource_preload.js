const
  $preload = document.querySelector('.preload'),
  $progress = $preload.querySelector('.preload-progress'),

  $screens = document.querySelector('.preload-screens'),
  $screensTop = $screens.querySelector('.preload-screens-top'),
  $screensBottom = $screens.querySelector('.preload-screens-bottom'),

  resource = {
    audios: [
      'audio/heartbeat.mp3',
      'audio/idle.mp3',
      'audio/monster_die1.mp3',
      'audio/monster_die2.mp3',
      'audio/monster_die3.mp3',
      'audio/monster_die4.mp3',
      'audio/reload.mp3',
      'audio/shoot1.mp3',
      'audio/shoot2.mp3',
      'audio/shoot3.mp3',
      'audio/shoot4.mp3',
      'audio/shoot5.mp3',
      'audio/shoot6.mp3',
      'audio/to_bad.mp3',
      'audio/dark_ambient.mp3'
    ],
    images: [
      'image/blood1.png',
      'image/blood2.png',
      'image/cat1.png',
      'image/cat2.png',
      'image/cat3.png',
      'image/cat4.png',
      'image/monster1.png',
      'image/monster2.png',
      'image/monster3.png',
      'image/monster4.png',
      'image/shootfire32.png',
      'image/sprite.png'
    ]
  };

const winWidth = window.innerWidth;
let preloadImageForestNight = 'image/forest_night_mobile.jpg';

if (winWidth >= 544 && winWidth <= 992) {
  preloadImageForestNight = 'image/forest_night_tablet.jpg';
}

if (winWidth >= 1200) {
  preloadImageForestNight = 'image/forest_night.jpg';
}

resource.images.push(preloadImageForestNight);

let
  loadCurrent = 0,
  loadAll = resource.audios.length + resource.images.length,
  stepLoadProgress = 100 / loadAll; // в % соотношении

function resourcePreload() {
  preparationAudios();
  preparationImages();
}

function preparationAudios() {
  resource.audios.forEach(audioSrc => {
    let audio = document.createElement('audio');
    audio.addEventListener('loadeddata', loadingProgress);
    audio.setAttribute('preload', 'auto');
    audio.setAttribute('src', audioSrc);
  });
}

function preparationImages() {
  resource.images.forEach(imageSrc => {
    let img = document.createElement('img');
    img.addEventListener('load', loadingProgress);
    img.setAttribute('src', imageSrc);
  });
}

function loadingProgress() {
  requestAnimationFrame(() => {
    loadCurrent += 1;
    let progress = (stepLoadProgress * loadCurrent).toFixed(2) + '%';
    $progress.textContent = progress;
    $progress.style.width = progress;
  });
}

function load() {
  window.removeEventListener('load', load);

  $progress.parentNode.style.opacity = 0;
  $screensTop.classList.add('preload-screens-top-end');
  $screensBottom.classList.add('preload-screens-bottom-end');

  setTimeout(() => {
    requestAnimationFrame(() => {
      $screens.remove();
      $preload.remove();
    });
  }, 250); /* animation 0.2s + 0.05 запас */
}

window.addEventListener('load', load);

export default resourcePreload;
