import debounce from 'libs/debounce';
import {audioURI, audioSprite} from './../helper/audio_sprite';
import noise from './../helper/noise';

const $body = document.body;
const fireRate = 166.6;
const shootFire = debounce(shoot, fireRate);
const audioIdle = audioSprite.idle;
const shootEvent = new Event('shoot');
const eventCatShoot = new Event('catShoot');
const eventEnemyKill = new Event('enemyKill');

let shootCountTotalStat = 0;
let shootCountInTargetStat = 0;
let shootCountInCatStat = 0;
let shootMoveTimerID;
let shootDownTimerID;

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

  // $event.dispatchEvent(new Event('damage'));

  const x = e.clientX;
  const y = e.clientY;

  shootEvent.shoot = {x, y};
  document.dispatchEvent(shootEvent);
  shootCountTotalStatistic();

  shootDelegate(e);
  shootDownTimerID = setTimeout(shoot.bind(null, e), fireRate);
}

function shootDelegate(e) {
  const target = e.target;

  /** выстрел по монстру */
  if (target.classList.contains('enemy')) {
    eventEnemyKill.enemy = target;
    document.dispatchEvent(eventEnemyKill);
    shootCountInTargetStatistic();

    /** выстрел по котику */
  } else if (target.classList.contains('cat')) {
    document.dispatchEvent(eventCatShoot);
    shootCountInTargetStatistic();
    shootCountInCatStatistic();
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
  // удаляет остатки выстрела (shootDown)
  clearTimeout(shootDownTimerID);
  // предотвращает преждевременную остановку выстрелов при движении
  clearTimeout(shootMoveTimerID);

  shootMoveTimerID = setTimeout(
    shootMoveStopAndShootDown.bind(null, e),
    fireRate
  );
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

function shootCountTotalStatistic() {
  shootCountTotalStat += 1;
}

function shootCountInTargetStatistic() {
  shootCountInTargetStat += 1;
}

function shootCountInCatStatistic() {
  shootCountInCatStat += 1;
}

function shootStatistic() {
  const shootCountEvent = new Event('shootCount');
  
  shootCountEvent.shootCountTotal = shootCountTotalStat;
  shootCountEvent.shootCountInTarget = shootCountInTargetStat;
  shootCountEvent.shootCountInCat = shootCountInCatStat;

  document.dispatchEvent(shootCountEvent);
}

function gameOver() {
  shootEnd();
  shootStatistic();
}

document.addEventListener('startGame', shootStart);
document.addEventListener('waveEnd', shootEnd);
document.addEventListener('waveStart', shootStart);
document.addEventListener('gameOver', gameOver);
