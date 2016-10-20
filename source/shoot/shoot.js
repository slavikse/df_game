import debounce from 'libs/debounce';
import noise from './../helper/noise';

const
  $body = document.body,
  fireRate = 166.6, // 6 выстрелов в 1 секунду
  shootFire = debounce(shoot, fireRate),
  audioURI = window.audioURI,
  audioIdle = window.audioSprite.idle,
  eventCatShoot = new Event('catShoot'),
  eventEnemyKill = new Event('enemyKill');

let
  shootCountTotal = 0, // выстрелов всего
  shootCountInTarget = 0, // пападание в цель
  shootCountInCat = 0, // пападание в бонусного котика
  movingGunTimerID = null,
  shootFireAutoTimerID,
  shootEvent = new Event('shoot');

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

  shootFireAutoTimerID = setTimeout(shoot.bind(null, e), fireRate);

  const
    target = e.target,
    x = e.clientX,
    y = e.clientY;

  shootEvent.shoot = {x, y};
  document.dispatchEvent(shootEvent);

  shootCountTotal += 1;

  // $event.dispatchEvent(new Event('damage'));

  /** выстрел по монстру */
  if (target.classList.contains('enemy')) {
    eventEnemyKill.enemy = e.target;
    document.dispatchEvent(eventEnemyKill);

    shootCountInTarget += 1;

    /** выстрел по котику */
  } else if (target.classList.contains('cat')) {
    document.dispatchEvent(eventCatShoot);

    shootCountInTarget += 1;
    shootCountInCat += 1;
  }
}

function shooting() {
  document.addEventListener('mousedown', shootAutoFireDown);
  document.addEventListener('mouseup', shootingStop);
}

function shootAutoFireDown(e) {
  shootFire(e);
  document.addEventListener('mousemove', shootAutoFireMove);
}

function shootAutoFireMove(e) {
  clearTimeout(movingGunTimerID);
  clearTimeout(shootFireAutoTimerID);

  movingGunTimerID = setTimeout(movingGunStop.bind(null, e), fireRate);
  shootFire(e);
}

function movingGunStop(e) {
  clearTimeout(movingGunTimerID);
  shootFire(e);
}

function noShooting() {
  document.removeEventListener('mousedown', shootAutoFireDown);
  document.removeEventListener('mouseup', shootingStop);

  shootingStop();
}

function shootingStop() {
  document.removeEventListener('mousemove', shootAutoFireMove);

  clearTimeout(movingGunTimerID);
  clearTimeout(shootFireAutoTimerID);
}

function gameOver() {
  noShooting();
  shootCountStatistic();
}

function shootCountStatistic() {
  let shootCountEvent = new Event('shootCount');

  shootCountEvent.shootCountTotal = shootCountTotal;
  shootCountEvent.shootCountInTarget = shootCountInTarget;
  shootCountEvent.shootCountInCat = shootCountInCat;

  document.dispatchEvent(shootCountEvent);
}

document.addEventListener('startGame', shooting);
document.addEventListener('waveEnd', noShooting);
document.addEventListener('waveStart', shooting);
document.addEventListener('gameOver', gameOver);
