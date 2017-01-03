const $preload = document.querySelector('.preload');
const resource = {
  audios: [
    'audio/audios.mp3',
    'audio/start_dark_ambient.mp3',
    //'audio/start_light_ambient.mp3', // брауз запрашивает сразу же
    'audio/shop_ambient.mp3'
  ],
  images: [
    //'image/sprite.png' // брауз запрашивает сам
  ]
};

resource.audios.forEach(audioPreload);

// хитрость, чтобы брауз реально запросил звуковые файлы. может и не работает
function audioPreload(audioSrc) {
  const audio = new Audio(audioSrc);

  audio.volume = 0;
  audio.play();
  audio.pause();
}

function load() {
  window.removeEventListener('load', load);
  $preload.style.opacity = 0;
  setTimeout(loadEnd, 1000); // animate
}

function loadEnd() {
  $preload.remove();
}

window.addEventListener('load', load);
//TODO проверить
