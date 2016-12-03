import debounce from 'libs/debounce';
import {audioURI, audioSprite} from './../helper/audio_sprite';
import noise from './../helper/noise';

const $body = document.body;
const $shoot = $body.querySelector('.shoot');
const fireRate = 166.6;
const shootFire = debounce(canShoot, fireRate);
const audioIdle = audioSprite.idle;
const shootEvent = new Event('shoot');
const eventCatShoot = new Event('catShoot');
const eventEnemyShoot = new Event('enemyShoot');
const eventBossShoot = new Event('bossShoot');

let shootCountTotalStat = 0;
let shootCountInTargetStat = 0;
let shootCountInCatStat = 0;
let shootCountInBossStat = 0;
let shootMoveTimerID;
let shootDownTimerID;

/** нажата ЛКМ,
 * выстрелы не заблокированы,
 * (введен дополнительный идентификатор [nothing-shoot], потому,
 * что dont-shoot используется многими модулями
 */
function canShoot(e) {
  if (e.which === 1 &&
    !$body.classList.contains('dont-shoot') &&
    !$body.classList.contains('nothing-shoot')
  ) {
    shoot(e);

    // document.dispatchEvent(new Event('damage'));

    // уведомляет о выстреле: оружие
    document.dispatchEvent(shootEvent);
    shootCountTotalStatistic();
  } else {
    noise(audioURI, audioIdle);
  }
}

function shoot(e) {
  const x = e.clientX;
  const y = e.clientY;

  shootSetParams(x, y);
  shootDelegate(e);
  shootDownTimerID = setTimeout(canShoot.bind(null, e), fireRate);
}

function shootSetParams(x, y) {
  $shoot.style.transform = `translate(${x}px, ${y}px)`;
  $shoot.style.opacity = 1;

  setTimeout(shootHide, 40);
}

function shootHide() {
  $shoot.style.opacity = 0;
}

function shootDelegate(e) {
  const target = e.target;

  if (target.classList.contains('enemy')) {
    shootEnemy(target);
  } else if (target.classList.contains('cat')) {
    shootCat();
  } else if (target.classList.contains('boss-part')) {
    shootBoss(target);
  }
}

function shootEnemy(target) {
  eventEnemyShoot.enemy = target;
  document.dispatchEvent(eventEnemyShoot);
  shootCountInTargetStatistic();
}

function shootCat() {
  document.dispatchEvent(eventCatShoot);
  shootCountInTargetStatistic();
  shootCountInCatStatistic();
}

function shootBoss(target) {
  eventBossShoot.bossPart = target;
  document.dispatchEvent(eventBossShoot);
  shootCountInTargetStatistic();
  shootCountInBossStatistic();
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

function shootCountInBossStatistic() {
  shootCountInBossStat += 1;
}

function gameOver() {
  shootEnd();
  shootStatistic();
}

function shootStatistic() {
  const shootCountEvent = new Event('shootCount');

  shootCountEvent.shootCountTotal = shootCountTotalStat;
  shootCountEvent.shootCountInTarget = shootCountInTargetStat;
  shootCountEvent.shootCountInCat = shootCountInCatStat;
  shootCountEvent.shootCountInBoss = shootCountInBossStat;

  document.dispatchEvent(shootCountEvent);
}

document.addEventListener('startGame', shootStart);
document.addEventListener('waveEnd', shootEnd);
document.addEventListener('waveStart', shootStart);
document.addEventListener('gameOver', gameOver);
