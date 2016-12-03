const $preLoaderWrap = document.querySelector('.pre-loader-wrap');
const resource = {
  audios: [
    'audio/audio_sprite.mp3',
    'audio/dark_ambient.mp3',
    //'audio/light_ambient.mp3', // брауз запрашивает сам
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

  //fix: Uncaught (in promise) DOMException: The play() request was interrupted
  // by a call to pause()
  setTimeout(audioStop.bind(null, audio), 2000);
}

function audioStop(audio) {
  audio.pause();
}

function load() {
  window.removeEventListener('load', load);
  $preLoaderWrap.style.opacity = 0;
  setTimeout(loadEnd, 1000); // animate
}

function loadEnd() {
  $preLoaderWrap.remove();
}

window.addEventListener('load', load);
