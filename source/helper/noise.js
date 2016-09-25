import range from 'libs/range';

/**
 * Воспроизводит звук или случайный звук если передано несколько
 * @param audioURI {Array,String} пути до звуков
 * @returns {Element} для внешней манипуляции
 */
function noise(audioURI) {
  let
    audio = document.createElement('audio'),
    uri = audioURI;

  if (Array.isArray(audioURI)) {
    let random = range(0, audioURI.length - 1);
    uri = audioURI[random];
  }

  audio.setAttribute('src', uri);
  audio.play();

  return audio;
}

export default noise;
