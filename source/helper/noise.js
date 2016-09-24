import range from 'libs/range';

/**
 * Воспроизводит случайный звук из переданных
 * @param audiosURI {Array,String} пути до звуков
 */
function noise(audiosURI) {
  let
    audio = document.createElement('audio'),
    uri = audiosURI;

  if (Array.isArray(audiosURI)) {
    let random = range(0, audiosURI.length - 1);
    uri = audiosURI[random];
  }

  audio.setAttribute('src', uri);
  audio.play();
}

export default noise;
