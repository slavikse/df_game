import './health_notice';
import noise from '../helper/noise';

const
  $body = document.body,
  $healthWrap = $body.querySelector('.health-wrap'),
  $firstAid = $healthWrap.querySelector('.first-aid').children,
  $healths = $healthWrap.querySelector('.health').children,
  firstAidStateClasses = [
    'icon-first_aid_circuit', // пустая
    'icon-first_aid' // целая
  ],
  healthStateClasses = [
    'icon-heart_abadon', // пустое
    'icon-heart_half' // половинка
  ],
  firstAidFull = $firstAid.length - 1, // аптечек [0,1]
  healthFull = healthStateClasses.length, // состояния сердца
  healthStateFull = healthStateClasses.length - 1, // состояние сердца, изначально сердце целое

  audioURI = window.audioURI,
  audioHeart = window.audioSprite.heart,

  $eventRegeneration = new Event('regeneration');

let
  receivedDamage = 0,
  firstAidUse = 0,
  firstAid = firstAidFull,
  health = healthFull,
  healthState = healthStateFull;

sessionStorage.setItem('firstAid', firstAid);

function damage() {

  /** GOD MOD */

  if (window.god) {
    return;
  }

  /** / GOD MOD */

  if (health === 0) {
    gameOver();
    return;
  }

  heartbeat();

  receivedDamage += 1;
}

function heartbeat() {
  /** последняя половинка сердца закончилась */
  if (healthState < 0) {
    health -= 1;
    healthState = healthStateFull;
  }

  $healths[health].className = healthStateClasses[healthState];
  $healths[health].style.animationName = 'health-blink';
  noise(audioURI, audioHeart);

  healthState -= 1;

  setTimeout(heartbeatEnd, 600); // анимация удара сердца
}

function heartbeatEnd() {
  $healths[health].style.animationName = '';
}

function useFirstAid() {
  if (firstAid < 0 || (
      /** полное хп */
      health === healthFull &&
      healthState === healthStateFull
    )) {
    return;
  }

  $firstAid[firstAid].className = firstAidStateClasses[0];
  firstAid -= 1;

  sessionStorage.setItem('firstAid', firstAid);

  regeneration();
}

function regeneration() {
  $body.classList.add('dont-shoot');

  health = healthFull;
  healthState = healthStateFull;

  document.dispatchEvent($eventRegeneration);

  for (let i = 0, len = $healths.length; i < len; i++) {
    $healths[i].className = 'icon-heart';
  }

  setTimeout(dontShootEnd, 400); // анимация

  firstAidUse += 1;
}

function dontShootEnd() {
  $body.classList.remove('dont-shoot');
}

function addFirstAid() {
  if (firstAid >= firstAidFull) {
    return;
  }

  firstAid += 1;
  $firstAid[firstAid].className = firstAidStateClasses[1];
  $firstAid[firstAid].style.animationName = 'first-aid-blink';

  sessionStorage.setItem('firstAid', firstAid);

  setTimeout(addFirstAidEnd, 600); // анимация
}

function addFirstAidEnd() {
  $firstAid[firstAid].style.animationName = '';
}

function gameOver() {
  document.removeEventListener('damage', damage);
  document.removeEventListener('keyup', HKeyHandler);
  document.removeEventListener('mousedown', CMBHandler);
  document.removeEventListener('keyup', TKeyHandler);

  document.dispatchEvent(new Event('gameOver'));

  receivedDamageStatistic();
  firstAidUseStatistic();
}

function receivedDamageStatistic() {
  let receivedDamageEvent = new Event('receivedDamage');
  receivedDamageEvent.receivedDamage = receivedDamage;
  document.dispatchEvent(receivedDamageEvent);
}

function firstAidUseStatistic() {
  let firstAidUseEvent = new Event('firstAidUse');
  firstAidUseEvent.firstAidUse = firstAidUse;
  document.dispatchEvent(firstAidUseEvent);
}

function HKeyHandler(e) {
  if (e.keyCode === 72) {
    useFirstAid();
  }
}

function CMBHandler(e) {
  if (e.which === 2) { // средняя кнопка мыши
    e.preventDefault();
    useFirstAid();
  }
}

function TKeyHandler(e) {
  if (e.keyCode === 84) {
    addFirstAid();
  }
}

document.addEventListener('buyFirstAid', addFirstAid);
document.addEventListener('damage', damage);
document.addEventListener('keyup', HKeyHandler);
document.addEventListener('mousedown', CMBHandler);
document.addEventListener('keyup', TKeyHandler);
