let gameTime;

function gameTimeStart() {
  gameTime = Date.now();
}

function gameTimeEnd() {
  const ms = Date.now() - gameTime;
  const s = Math.trunc(ms / 1000);
  const m = Math.trunc(s / 60);
  const minutes = m;
  const second = s - m * 60;

  return {
    minutes,
    second
  }
}

document.addEventListener('startGame', gameTimeStart);
document.addEventListener('gameOver', gameTimeEnd);

export default gameTimeEnd;
