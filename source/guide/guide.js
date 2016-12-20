import {audioURI, audioSprite} from './../helper/audio_sprite';
import noise from './../helper/noise';

const $guideHelp = document.querySelector('.guide-help');
const $guideWrap = document.querySelector('.guide-wrap');
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

  $guideWrap.classList.toggle('guide-wrap-show');
  noise(audioURI, audioAuthShow);
}

function signToggle() {
  $guideHelp.textContent = signs[currentSign];
  currentSign = (currentSign + 1) % signsLength;
}

function closeGuide() {
  currentSign = 0;
  $guideHelp.textContent = '?';
  $guideWrap.classList.remove('guide-wrap-show');
}

$guideHelp.addEventListener('mouseenter', hoverGuide);
$guideHelp.addEventListener('click', showGuide);
document.addEventListener('closeGuide', closeGuide);
