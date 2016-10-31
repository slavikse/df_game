import range from 'libs/range';

/**
 * Воспроизводит звук или случайный звук если передано несколько параметров звука
 * @param uri {String} путь до звука или спрайта звуков
 * @param params {Array} параметры воспроизведения, может быть несколько
 * @returns {Object} для внешней манипуляции
 */
function noise(uri, params) {
  let audio = new Audio(uri);

  audio = setParam(audio, params);
  audio.play();

  return audio;
}

function setParam(audio, params) {
  const
    param = getRandom(params),
    startTime = param[0] / 1000, // время в секундах
    duration = param[1].toFixed(2); // продолжительность в ms

  audio.currentTime = startTime;

  setTimeout(playEnd.bind(null, audio), duration);

  return audio;
}

function playEnd(audio) {
  audio.pause();
  audio = null;
}

function getRandom(params) {
  let param = params;

  /** проверка на массив в массиве */
  if (Array.isArray(params[0])) {
    const random = range(0, params.length - 1);
    param = params[random];
  }

  return param;
}

export default noise;
