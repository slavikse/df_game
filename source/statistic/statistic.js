import costsGet from './costs';
import discardedBulletGet from './discarded_bullet';
import drumReloadCountGet from './drum_reload_count';
import firstAidUseGet from './first_aid_use';
import gameTimeEnd from './game_time';
import receivedDamageGet from './received_damage';
import shootCountGet from './shoot_count';
import waveCountGet from './wave_count';

let statistic;

function saveStatisticWrap() {
  setTimeout(statisticGet, 20); // дожидаемся всех
}

function statisticGet() {
  const
    score = sessionStorage.getItem('score'),
    costs = costsGet(),
    discardedBullet = discardedBulletGet(),
    drumReload = drumReloadCountGet(),
    firstAid = firstAidUseGet(),
    {
      minutes,
      second
    } = gameTimeEnd(),
    receivedDamage = receivedDamageGet(),
    {
      shoots,
      inTarget,
      miss,
      inTargetPercent,
      bonusWave
    } = shootCountGet(),
    waveCount = waveCountGet();

  statistic = {
    'Время игры': `${minutes}m ${second}s`,
    'Волн пройдено': waveCount,
    'Доп волн': bonusWave,
    'Очков набрано': score,
    'Расходы ($)': costs,
    'Перезарядок': drumReload,
    'Пуль выброшено': discardedBullet,
    'Получено урона': receivedDamage,
    'Лечения': firstAid,
    'Выстрелов': shoots,
    'В цель': inTarget,
    'Промахов': miss,
    'Точность (%)': inTargetPercent
  };

  // localStorage.setItem('statistic', JSON.stringify(statistic));

  statisticSend();
}

function statisticSend() {
  let statisticEvent = new Event('statistic');
  statisticEvent.statistic = statistic;
  document.dispatchEvent(statisticEvent);
}

document.addEventListener('gameOver', saveStatisticWrap);
