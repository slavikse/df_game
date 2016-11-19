import {audioURI, audioSprite} from './../helper/audio_sprite';
import noise from '../helper/noise';
import '../health_notice/health_notice';

const $body = document.body;
const $healthWrap = $body.querySelector('.health-wrap');
const $firstAid = $healthWrap.querySelector('.first-aid').children;
const $healths = $healthWrap.querySelector('.health').children;
const firstAidStateClasses = [
  'icon-first_aid_circuit', // пустая
  'icon-first_aid' // целая
];
const healthStateClasses = [
  'icon-heart_abadon', // пустое
  'icon-heart_half' // половинка
];
const firstAidFull = $firstAid.length - 1;
const healthFull = healthStateClasses.length;
const healthStateFull = healthStateClasses.length - 1;
const audioHeart = audioSprite.heart;
const eventRegeneration = new Event('regeneration');

let receivedDamageStat = 0;
let firstAidUseStat = 0;
let firstAid = firstAidFull;
let health = healthFull;
let healthState = healthStateFull;
let eventFirstAidShop = new Event('firstAidShop');

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
  saveReceivedDamageStat();
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

  regeneration();
}

function regeneration() {
  $body.classList.add('dont-shoot');

  health = healthFull;
  healthState = healthStateFull;

  document.dispatchEvent(eventRegeneration);

  for (let i = 0, len = $healths.length; i < len; i++) {
    $healths[i].className = 'icon-heart';
  }

  setTimeout(dontShootEnd, 400); // анимация
  saveFirstAidUseStat();
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

  setTimeout(addFirstAidEnd, 600); // анимация
}

function addFirstAidEnd() {
  $firstAid[firstAid].style.animationName = '';
}

function firstAidShop() {
  eventFirstAidShop.firstAid = firstAid;
  document.dispatchEvent(eventFirstAidShop);
}

function saveFirstAidUseStat() {
  firstAidUseStat += 1;
}

function saveReceivedDamageStat() {
  receivedDamageStat += 1;
}

function receivedDamageStatistic() {
  let receivedDamageEvent = new Event('receivedDamage');
  receivedDamageEvent.receivedDamage = receivedDamageStat;
  document.dispatchEvent(receivedDamageEvent);
}

function firstAidUseStatistic() {
  let firstAidUseEvent = new Event('firstAidUse');
  firstAidUseEvent.firstAidUse = firstAidUseStat;
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

function gameOver() {
  document.removeEventListener('damage', damage);
  document.removeEventListener('keyup', HKeyHandler);
  document.removeEventListener('mousedown', CMBHandler);
  document.removeEventListener('keyup', TKeyHandler);

  receivedDamageStatistic();
  firstAidUseStatistic();

  document.dispatchEvent(new Event('gameOver'));
}

document.addEventListener('buyFirstAid', addFirstAid);
document.addEventListener('damage', damage);
document.addEventListener('keyup', HKeyHandler);
document.addEventListener('mousedown', CMBHandler);
document.addEventListener('waveEnd', firstAidShop);
document.addEventListener('keyup', TKeyHandler);
