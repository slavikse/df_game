import {audioURI, audioSprite} from './../helper/audio_sprite';
import noise from './../helper/noise';

const
  $guideHelp = document.querySelector('.guide-help'),
  $guideWrap = document.querySelector('.guide-wrap'),

  audioHoverMenu = audioSprite.hover_menu,
  audioAuthShow = audioSprite.auth_show,

  texts = [
    'X',
    '?'
  ],
  textsLength = texts.length - 1;

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
