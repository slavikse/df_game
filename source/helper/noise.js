import range from 'libs/range';

/**
 * Воспроизводит звук или случайный звук если передано несколько параметров звука
 * @param uri {String} путь до звука или спрайта звуков
 * @param params {Array} параметры воспроизведения, может быть несколько
 * @returns {Object} для внешней манипуляции
 */
function noise(uri, params) {
  let audio = new Audio();

  audio = setParam(audio, params);
  audio.setAttribute('src', uri);
  audio.play();

  return audio;
}

function setParam(audio, params) {
  const
    param = getRandom(params),
    /** время в секундах */
    startTime = param[0] / 1000,
    /** продолжительность в ms */
    duration = param[1].toFixed(2);

  audio.currentTime = startTime;

  setTimeout(() => {
    audio.pause();
    audio = null;
  }, duration);

  return audio;
}

function getRandom(params) {
  let param = params;

  /** проверка на массив массивов */
  if (Array.isArray(params[0])) {
    const random = range(0, params.length - 1);
    param = params[random];
  }

  return param;
}

export default noise;
