import {audioURI, audioSprite} from './../helper/audio_sprite.js';
import noise from './../helper/noise.js';

const $guideHelp = document.querySelector('.guide-help');
const $guideWrap = document.querySelector('.guide-wrap');
const audioHoverMenu = audioSprite.hover_menu;
const audioAuthShow = audioSprite.auth_show;
const texts = [
  'X',
  '?'
];
const textsLength = texts.length - 1;

let i = 0;

function hoverGuide() {
  noise(audioURI, audioHoverMenu);
}

function textToggle() {
  $guideHelp.textContent = texts[i];

  if (i === textsLength) {
    i = 0;
  } else {
    i += 1;
  }
}

function showGuide() {
  textToggle();

  $guideWrap.classList.toggle('guide-wrap-show');
  noise(audioURI, audioAuthShow);
}

$guideHelp.addEventListener('mouseover', hoverGuide);
$guideHelp.addEventListener('click', showGuide);
