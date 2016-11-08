import './../health/health.js';
import './../score/score.js';
import './../ticker/ticker.js';
import './../enemy_count/enemy_count';
import './../revolver/revolver.js';

const $panel = document.querySelector('.panel');

function removePanel() {
  $panel.remove();
}

document.addEventListener('gameOver', removePanel);
