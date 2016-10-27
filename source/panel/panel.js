import './../health/health.js';
import './../score/score.js';
import './../next_wave/next_wave.js';
import './../enemy/enemy_count';
import './../revolver/revolver.js';

const $panel = document.querySelector('.panel');

function removePanel() {
  $panel.remove();
}

document.addEventListener('gameOver', removePanel);
