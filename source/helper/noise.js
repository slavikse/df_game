import range from 'libs/range';

/**
 * Воспроизводит случайный звук из переданных
 * @param soundsURI {Array} пути до звуков
 */
function noise(soundsURI) {
  let
    random = range(0, soundsURI.length - 1),
    audio = new Audio(soundsURI[random]);

  audio.play();
}

export default noise;
