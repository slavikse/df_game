const
  $preloader = document.querySelector('.resource-preload'),
  $progress = document.querySelector('.resource-preload-progress'),
  $event = document.querySelector('.event'),
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
      'audio/to_bad.mp3'
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
  },
  eventGameLoaded = new Event('gameLoaded');

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
  loadCurrent += 1;
  $progress.style.width = `${stepLoadProgress * loadCurrent}%`;
}

function load() {
  window.removeEventListener('load', load);
  $event.dispatchEvent(eventGameLoaded);
  $preloader.classList.add('preload-end');

  setTimeout(() => {
    $preloader.remove();
  }, 450);
}

window.addEventListener('load', load);

export default resourcePreload;
