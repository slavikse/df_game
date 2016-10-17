let gameTime;

function gameTimeStart() {
  gameTime = Date.now();
}

function gameTimeEnd() {
  const
    ms = Date.now() - gameTime,
    s = Math.trunc(ms / 1000),
    m = Math.trunc(s / 60),

    minutes = m,
    second = s - m * 60;

  return {
    minutes,
    second
  }
}

document.addEventListener('startGame', gameTimeStart);
document.addEventListener('gameOver', gameTimeEnd);

export default gameTimeEnd;
