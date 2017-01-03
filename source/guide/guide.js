import {audioSprite, audioURI} from 'helper/audios';
import noise from 'helper/noise';

const $guideHelp = document.querySelector('.guide__help');
const $guide = document.querySelector('.guide');
const audioHoverMenu = audioSprite.hover_menu;
const audioAuthShow = audioSprite.auth_show;
const signs = ['X', '?'];
const signsLength = signs.length;

let currentSign = 0;

function hoverGuide() {
  noise(audioURI, audioHoverMenu);
}

function showGuide() {
  signToggle();

  $guide.classList.toggle('guide__show');
  noise(audioURI, audioAuthShow);
}

function signToggle() {
  $guideHelp.textContent = signs[currentSign];
  currentSign = (currentSign + 1) % signsLength;
}

function closeGuide() {
  currentSign = 0;
  $guideHelp.textContent = '?';
  $guide.classList.remove('guide__show');
}

$guideHelp.addEventListener('mouseenter', hoverGuide);
$guideHelp.addEventListener('click', showGuide);
document.addEventListener('closeGuide', closeGuide);
