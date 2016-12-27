import fb from './../helper/fb';
import getBossKilled from './boss_killed';
import getCosts from './costs';
import getDiscardedBullet from './discarded_bullet';
import getDrumReloadCount from './drum_reload_count';
import getFirstAidUse from './first_aid_use';
import gameTimeEnd from './game_time';
import getGrenade from './grenade';
import getReceivedDamage from './received_damage';
import getScore from './score';
import getShootCount from './shoot_count';
import getWaveCount from './wave_count';

const db = fb.database();

let uid;
let score;

fb.auth().onAuthStateChanged(auth);

function auth(user) {
  if (user && user.uid) {
    uid = user.uid;
  }
}

function getStatistic() {
  score = getScore();

  const bossKilled = getBossKilled();
  const costs = getCosts();
  const discardedBullet = getDiscardedBullet();
  const drumReload = getDrumReloadCount();
  const firstAid = getFirstAidUse();
  const {minutes, second} = gameTimeEnd();
  const grenade = getGrenade();
  const receivedDamage = getReceivedDamage();
  const {
    shoots,
    inTarget,
    miss,
    inTargetPercent,
    shootCat
  } = getShootCount();
  const waveCount = getWaveCount();
  const data = {
    'Время игры': `${minutes}м ${second}с`,
    'Пройдено волн': waveCount,
    'Сверх волн': shootCat,
    'Боссов убито': bossKilled,
    'Заработано': `$${score}`,
    'Расходы': `$${costs}`,
    'Перезарядок': drumReload,
    'Пуль выброшено': discardedBullet,
    'Получено урона': receivedDamage,
    'Аптечек': firstAid,
    'Выстрелов': shoots,
    'В цель': inTarget,
    'Промахов': miss,
    'Точность': `${inTargetPercent}%`,
    'Гранаты': grenade
  };

  getBestScore();
  localSaveBestScore();
  resultStatistic(data);
}

function getBestScore() {
  if (uid) {
    db.ref(`user/${uid}`).once('value').then(bestScore);
  }
}

function bestScore(snapshot) {
  let bestScore = 0;

  if (snapshot.val() && snapshot.val().bestScore) {
    bestScore = snapshot.val().bestScore;
  }

  if (score > bestScore) {
    saveBestScore();
  }
}

function saveBestScore() {
  db.ref(`user/${uid}`).set({bestScore: score});
}

function localSaveBestScore() {
  const bestScore = localStorage.getItem('best-score') || 0;

  if (score > bestScore) {
    localStorage.setItem('best-score', score);
  }
}

function resultStatistic(data) {
  const statisticEvent = new Event('statistic');
  statisticEvent.statistic = data;
  document.dispatchEvent(statisticEvent);
}

document.addEventListener('gameOver', getStatistic);
