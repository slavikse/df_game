import 'health/health';
import 'score/score';
import 'ticker/ticker';
import 'grenade/grenade';
import 'revolver/revolver';

const $panel = document.querySelector('.panel');

function showPanel() {
  $panel.classList.add('panel__show');
}

document.addEventListener('startGame', showPanel);
