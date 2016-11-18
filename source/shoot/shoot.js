import debounce from 'libs/debounce';
import {audioURI, audioSprite} from './../helper/audio_sprite.js';
import noise from './../helper/noise.js';

const $body = document.body;
const fireRate = 166.6;
const shootFire = debounce(shoot, fireRate);
const audioIdle = audioSprite.idle;
const eventCatShoot = new Event('catShoot');
const eventEnemyKill = new Event('enemyKill');

let shootCountTotalStat = 0;
let shootCountInTargetStat = 0;
let shootCountInCatStat = 0;
let shootMoveTimerID;
let shootDownTimerID;
let shootEvent = new Event('shoot');
let shootCountEvent = new Event('shootCount');

function shoot(e) {
  /** нажата не ЛКМ */
  if (e.which !== 1) {
    return;
  } else

  /** выстрелы заблокированы
   * (введен дополнительный идентификатор [nothing-shoot], потому,
   * что dont-shoot используется многими модулями.
   * Тем самым это некое разделение ответственности)
   */
  if (
    $body.classList.contains('dont-shoot') ||
    $body.classList.contains('nothing-shoot')
  ) {
    noise(audioURI, audioIdle);
    return;
  }

  shootDownTimerID = setTimeout(shoot.bind(null, e), fireRate);

  const target = e.target;
  const x = e.clientX;
  const y = e.clientY;

  shootEvent.shoot = {x, y};
  document.dispatchEvent(shootEvent);
  saveShootCountTotalStat();

  // $event.dispatchEvent(new Event('damage'));

  /** выстрел по монстру */
  if (target.classList.contains('enemy')) {
    eventEnemyKill.enemy = e.target;
    document.dispatchEvent(eventEnemyKill);
    saveShootCountInTargetStat();

    /** выстрел по котику */
  } else if (target.classList.contains('cat')) {
    document.dispatchEvent(eventCatShoot);
    saveShootCountInTargetStat();
    saveShootCountInCatStat();
  }
}

function shootStart() {
  document.addEventListener('mousedown', shootDown);
  document.addEventListener('mouseup', shootUp);
}

function shootDown(e) {
  shootFire(e);
  document.addEventListener('mousemove', shootMove);
}

function shootUp() {
  document.removeEventListener('mousemove', shootMove);

  clearTimeout(shootDownTimerID);
  clearTimeout(shootMoveTimerID);
}

function shootMove(e) {
  clearTimeout(shootDownTimerID); // удаляет остатки выстрела (shootDown)
  clearTimeout(shootMoveTimerID); // предотвращает преждевременную остановку выстрелов при движении

  shootMoveTimerID = setTimeout(shootMoveStopAndShootDown.bind(null, e), fireRate);
  shootFire(e); // при движении вызывается выстрел
}

/**
 * курсор: остановившись остановит выстрелы при движении
 * и начнет выстрелы в точку, пока зажата ЛКМ
 */
function shootMoveStopAndShootDown(e) {
  clearTimeout(shootMoveTimerID);
  shootFire(e);
}

function shootEnd() {
  document.removeEventListener('mousedown', shootDown);
  document.removeEventListener('mousemove', shootMove);
}

function saveShootCountTotalStat() {
  shootCountTotalStat += 1;
}

function saveShootCountInTargetStat() {
  shootCountInTargetStat += 1;
}

function saveShootCountInCatStat() {
  shootCountInCatStat += 1;
}

function shootCountStatistic() {
  shootCountEvent.shootCountTotal = shootCountTotalStat;
  shootCountEvent.shootCountInTarget = shootCountInTargetStat;
  shootCountEvent.shootCountInCat = shootCountInCatStat;

  document.dispatchEvent(shootCountEvent);
}

function gameOver() {
  shootEnd();
  shootCountStatistic();
}

document.addEventListener('startGame', shootStart);
document.addEventListener('waveEnd', shootEnd);
document.addEventListener('waveStart', shootStart);
document.addEventListener('gameOver', gameOver);
