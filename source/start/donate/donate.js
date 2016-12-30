import {audioSprite, audioURI} from 'helper/audios';
import noise from 'helper/noise';

const $donate = document.querySelector('.donate');
const audioDonateHover = audioSprite.donate_hover;
const audioDonateClick = audioSprite.donate_click;

function donateHover() {
  setTimeout(noise.bind(null, audioURI, audioDonateHover), 250);
}

function donateClick() {
  noise(audioURI, audioDonateClick);
}

$donate.addEventListener('mouseenter', donateHover);
$donate.addEventListener('click', donateClick);
