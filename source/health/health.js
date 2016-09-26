import noise from '../helper/noise';

const
  $body = document.querySelector('body'),
  $healthWrap = $body.querySelector('.health-wrap'),
  $firstAid = $healthWrap.querySelector('.first-aid').children,
  $healths = $healthWrap.querySelector('.health').children,
  $healthCritical = $body.querySelector('.health-critical'),
  $event = $body.querySelector('.event'),
  firstAidStateClasses = [
    'icon-first_aid_circuit', // пустая
    'icon-first_aid' // целая
  ],
  healthStateClasses = [
    'icon-heart_abadon', // пустое
    'icon-heart_half', // половинка
    'icon-heart' // целое
  ],
  firstAidFull = 1, // [0-1] аптечек
  healthFull = 2, // 3 состояния сердца [0-2]
  healthStateFull = 1; // состояние сердца из [0-1] потому, что изначально сердце целое

let
  firstAid = firstAidFull,
  health = healthFull,
  healthState = healthStateFull;

function damage() {
  /** защита от остаточного урона, у удаленных мобов не удаляются их таймеры урона */
  if (health < 0) {
    return;
  }

  hit();

  /* последняя половинка сердца закончилась */
  if (healthState < 0) {
    health -= 1;
    healthState = healthStateFull;
  }

  if (health < 0) {
    gameOver();
  }
}

function hit() {
  if (window.god) {
    return;
  }

  $healths[health].className = healthStateClasses[healthState];
  $healths[health].style.animationName = 'health-blink';
  $healthCritical.style.animationName = 'health-critical';
  noise('audio/heartbeat.mp3');
  healthState -= 1;

  setTimeout(() => {
    /** защита от остаточного урона, у удаленных мобов не удаляются их таймеры урона */
    if (health < 0) {
      return;
    }

    $healths[health].style.animationName = '';
    $healthCritical.style.animationName = '';
  }, 1200); // 2 анимации по 600 ms
}

function useFirstAid() {
  if (firstAid < 0) {
    return;
  }

  $firstAid[firstAid].className = firstAidStateClasses[0];
  firstAid -= 1;

  regeneration();
}

function regeneration() {
  $body.classList.add('dont-shoot');

  health = healthFull;
  healthState = healthStateFull;

  for (let i = 0, len = $healths.length; i < len; i++) {
    $healths[i].className = 'icon-heart';
  }

  setTimeout(() => {
    $body.classList.remove('dont-shoot');
  }, 400);
}

function addFirstAid() {
  if (firstAid >= firstAidFull) {
    return;
  }

  firstAid += 1;
  $firstAid[firstAid].className = firstAidStateClasses[1];
  $firstAid[firstAid].style.animationName = 'first-aid-blink';

  setTimeout(() => {
    $firstAid[firstAid].style.animationName = '';
  }, 600);
}

function gameOver() {
  window.removeEventListener('keyup', HKeyHandler);
  window.removeEventListener('keyup', TKeyHandler);

  $healthCritical.classList.add('game-over');
  $healthCritical.style.animationName = 'game-over';

  $event.dispatchEvent(new Event('stopGame'));
  $event.dispatchEvent(new Event('result'));
}

function HKeyHandler(e) {
  if (e.keyCode === 72) { // H
    useFirstAid();
  }
}

function TKeyHandler(e) {
  if (e.keyCode === 84) { // T
    addFirstAid();
  }
}

$event.addEventListener('firstAidDropped', addFirstAid);
$event.addEventListener('damage', damage);
window.addEventListener('keyup', HKeyHandler);
window.addEventListener('keyup', TKeyHandler);
$healthWrap.addEventListener('click', useFirstAid);
