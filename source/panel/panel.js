import './../health/health.js';
import './../score/score.js';
import './../ticker/ticker.js';
import './../enemy_count/enemy_count.js';
import './../revolver/revolver.js';

const $panel = document.querySelector('.panel');

function showPanel() {
  $panel.classList.add('panel-show');
}

function removePanel() {
  $panel.remove();
}

document.addEventListener('startGame', showPanel);
document.addEventListener('gameOver', removePanel);
