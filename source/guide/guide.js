import {audioURI, audioSprite} from './../helper/audio_sprite';
import noise from './../helper/noise';

const
  $guideHelp = document.querySelector('.guide-help'),
  audioHoverMenu = audioSprite.hover_menu;

function hoverMenu() {
  noise(audioURI, audioHoverMenu);
}

$guideHelp.addEventListener('mouseover', hoverMenu);
