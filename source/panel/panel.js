import './../health/health';
import './../score/score';
import './../ticker/ticker';
import './../enemy_count/enemy_count';
import './../grenade/grenade';
import './../revolver/revolver';

const $panel = document.querySelector('.panel');

function showPanel() {
  $panel.classList.add('panel-show');
}

function removePanel() {
  $panel.remove();
}

document.addEventListener('startGame', showPanel);
document.addEventListener('gameOver', removePanel);
