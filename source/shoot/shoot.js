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
  shootMoveTimerID,
  shootDownTimerID,
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

  shootDownTimerID = setTimeout(shoot.bind(null, e), fireRate);

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

function gameOver() {
  shootEnd();
  shootCountStatistic();
}

function shootCountStatistic() {
  let shootCountEvent = new Event('shootCount');

  shootCountEvent.shootCountTotal = shootCountTotal;
  shootCountEvent.shootCountInTarget = shootCountInTarget;
  shootCountEvent.shootCountInCat = shootCountInCat;

  document.dispatchEvent(shootCountEvent);
}

document.addEventListener('startGame', shootStart);
document.addEventListener('waveEnd', shootEnd);
document.addEventListener('waveStart', shootStart);
document.addEventListener('gameOver', gameOver);
