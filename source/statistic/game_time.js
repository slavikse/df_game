let gameTime;

function gameTimeStart() {
  gameTime = Date.now();
}

function gameTimeEnd() {
  const
    ms = Date.now() - gameTime,
    s = Math.trunc(ms / 1000),
    m = Math.trunc(s / 60);

  console.log(`
    Время игры:
      Минут: ${m}
      Секунд: ${s}
  `);
}

document.addEventListener('startGame', gameTimeStart);
document.addEventListener('gameOver', gameTimeEnd);
