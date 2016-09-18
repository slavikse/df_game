import range from 'libs/range';

/**
 * Воспроизводит случайный звук из переданных
 * @param audiosURI {Array} пути до звуков
 */
function noise(audiosURI) {
  const
    random = range(0, audiosURI.length - 1),
    audio = document.createElement('audio');

  audio.setAttribute('src', audiosURI[random]);
  audio.play();
}

export default noise;
