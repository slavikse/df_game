import noise from '../helper/noise';
import './health_notice';

const
  $body = document.querySelector('body'),
  $healthWrap = $body.querySelector('.health-wrap'),
  $firstAid = $healthWrap.querySelector('.first-aid').children,
  $healths = $healthWrap.querySelector('.health').children,
  $event = $body.querySelector('.event'),
  $eventRegeneration = new Event('regeneration'),
  firstAidStateClasses = [
    'icon-first_aid_circuit', // пустая
    'icon-first_aid' // целая
  ],
  healthStateClasses = [
    'icon-heart_abadon', // пустое
    'icon-heart_half' // половинка
  ],
  firstAidFull = $firstAid.length - 1, // аптечек
  healthFull = healthStateClasses.length, // состояния сердца
  healthStateFull = healthStateClasses.length - 1, // состояние сердца, изначально сердце целое
  audioSprite = window.audioSprite,
  audioSpriteHeart = window.audioSpriteJson.heart;

let
  firstAid = firstAidFull,
  health = healthFull,
  healthState = healthStateFull;

function damage() {
  if (window.god) {
    return;
  }

  if (health <= 0) {
    gameOver();
    return;
  }

  heartbeat();
}

function heartbeat() {
  /** последняя половинка сердца закончилась */
  if (healthState < 0) {
    health -= 1;
    healthState = healthStateFull;
  }

  $healths[health].className = healthStateClasses[healthState];
  $healths[health].style.animationName = 'health-blink';
  noise(audioSprite, audioSpriteHeart);

  healthState -= 1;

  setTimeout(() => {
    $healths[health].style.animationName = '';
  }, 600); // анимация удара сердца
}

function useFirstAid() {
  if (
    firstAid < 0 || (
      /** полное хп */
      health === healthFull &&
      healthState === healthStateFull
    )
  ) {
    return;
  }

  $firstAid[firstAid].className = firstAidStateClasses[0];
  firstAid -= 1;

  regeneration();
}

function regeneration() {
  $body.classList.add('dont-shoot');
  $event.dispatchEvent($eventRegeneration);

  health = healthFull;
  healthState = healthStateFull;

  for (let i = 0, len = $healths.length; i < len; i++) {
    $healths[i].className = 'icon-heart';
  }

  setTimeout(() => {
    $body.classList.remove('dont-shoot');
  }, 400); // анимация
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
  }, 600); // анимация
}

function gameOver() {
  $event.removeEventListener('firstAidDropped', addFirstAid);
  $event.removeEventListener('damage', damage);
  $healthWrap.removeEventListener('click', useFirstAid);
  window.removeEventListener('keyup', HKeyHandler);
  window.removeEventListener('keyup', TKeyHandler);

  $event.dispatchEvent(new Event('gameOver'));
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
$healthWrap.addEventListener('click', useFirstAid);
window.addEventListener('keyup', HKeyHandler);
window.addEventListener('keyup', TKeyHandler);
