import range from 'libs/range';

/**
 * Воспроизводит звук или случайный звук если передано несколько в audioURI
 * Получая параметры, войсер узнает, что передан спрайт
 * @param audioURI {Array,String} пути до звуков или звука
 * @param audioParam {Object,Array} параметры воспроизведения, может быть несколько
 * @returns {Element} для внешней манипуляции
 */
function noise(audioURI, audioParam = false) {
  let
    audio = document.createElement('audio'),
    uri = getRandom(audioURI);

  if (audioParam) {
    audio = setAudioParam(audio, audioParam);
  }

  audio.setAttribute('src', uri);
  audio.play();

  return audio;
}

function setAudioParam(audio, audioParam) {
  let param = getRandom(audioParam);

  let
    start = param.start,
    end = param.end,
    playTime = (end - start).toFixed(2) * 1000;

  audio.currentTime = start;

  setTimeout(() => {
    audio.pause();
  }, playTime);

  return audio;
}

function getRandom(values) {
  let value = values;

  if (Array.isArray(values)) {
    let random = range(0, values.length - 1);
    value = values[random];
  }

  return value;
}

export default noise;
