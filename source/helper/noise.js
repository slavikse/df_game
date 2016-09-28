import range from 'libs/range';

/**
 * Воспроизводит звук или случайный звук если передано несколько
 * @param audioURI {Array,String} пути до звуков
 * @param audioParam {Object} параметры воспроизведения
 * @returns {Element} для внешней манипуляции
 */
function noise(audioURI, audioParam = false) {
  let
    audio = document.createElement('audio'),
    uri = getAudioURI(audioURI);

  audio.setAttribute('src', uri);

  if (audioParam) {
    audio = setAudioParam(audio, audioParam);
  }

  audio.play();

  return audio;
}

function getAudioURI(audioURI) {
  let uri = audioURI;

  if (Array.isArray(audioURI)) {
    let random = range(0, audioURI.length - 1);
    uri = audioURI[random];
  }

  return uri;
}

function setAudioParam(audio, audioParam) {
  let
    start = audioParam.start,
    end = audioParam.end,
    playTime = (end - start).toFixed(2) * 1000;

  audio.currentTime = start;

  setTimeout(() => {
    audio.pause();
  }, playTime);

  return audio;
}

export default noise;
