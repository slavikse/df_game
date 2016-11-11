import fb from './../helper/fb';
import delay from 'libs/delay';
import getCosts from './costs';
import getDiscardedBullet from './discarded_bullet';
import getDrumReloadCount from './drum_reload_count';
import getFirstAidUse from './first_aid_use';
import gameTimeEnd from './game_time';
import getReceivedDamage from './received_damage';
import getScore from './score';
import getShootCount from './shoot_count';
import getWaveCount from './wave_count';

const
  getStatisticDelay = delay(getStatistic, 30), // дожидаемся всех
  db = fb.database();

let
  uid,
  score;

fb.auth().onAuthStateChanged(auth);

function auth(user) {
  uid = (user && user.uid) ? user.uid : null;
}

function getStatistic() {


  console.log('what?');

  
  score = getScore();

  const
    costs = getCosts(),
    discardedBullet = getDiscardedBullet(),
    drumReload = getDrumReloadCount(),
    firstAid = getFirstAidUse(),
    {minutes, second} = gameTimeEnd(),
    receivedDamage = getReceivedDamage(),
    {shoots, inTarget, miss, inTargetPercent, bonusWave} = getShootCount(),
    waveCount = getWaveCount(),

    tmpl = {
      'Время игры': `${minutes}m ${second}s`,
      'Волн пройдено': waveCount,
      'Доп волн': bonusWave,
      'Заработано': `${score}$`,
      'Расходы': `${costs}$`,
      'Перезарядок': drumReload,
      'Пуль выброшено': discardedBullet,
      'Получено урона': receivedDamage,
      'Лечения': firstAid,
      'Выстрелов': shoots,
      'В цель': inTarget,
      'Промахов': miss,
      'Точность': `${inTargetPercent}%`
    };

  getBestScore();
  localSaveBestScore();
  resultStatistic(tmpl);
}

function getBestScore() {
  if (uid) {
    db.ref(uid)
    .once('value')
    .then(bestScore);
  }
}

function bestScore(snapshot) {
  if (snapshot.val() && snapshot.val().bestScore) {
    const bestScore = snapshot.val().bestScore;

    if (score > bestScore) {
      saveBestScore();
    }
  }
}

function saveBestScore() {
  db.ref(uid).set({
    bestScore: score
  });
}

function localSaveBestScore() {
  const bestScore = localStorage.getItem('best-score') || 0;

  if (score > bestScore) {
    localStorage.setItem('best-score', score);
  }
}

function resultStatistic(tmpl) {
  let statisticEvent = new Event('statistic');
  statisticEvent.statistic = tmpl;
  document.dispatchEvent(statisticEvent);
}

document.addEventListener('gameOver', getStatisticDelay);
