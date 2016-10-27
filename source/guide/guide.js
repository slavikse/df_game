import noise from './../helper/noise';

const
  $guideHelp = document.querySelector('.guide-help'),
  audioURI = window.audioURI,
  audioHoverMenu = window.audioSprite.hover_menu;

function hoverMenu() {
  noise(audioURI, audioHoverMenu);
}

$guideHelp.addEventListener('mouseover', hoverMenu);
