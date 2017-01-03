const $coming = document.querySelector('.boss-coming');
const $progress = $coming.querySelector('.boss-coming__progress');
const $bossHead = $coming.querySelector('.boss-coming__head');
// 3 раза по 3 волны
const wavesBeforeComingDefault = 9; // 3 * 3
const shiftX = (100 / wavesBeforeComingDefault).toFixed(2);
const eventBossCame = new Event('bossCame');

let wavesBeforeComing = wavesBeforeComingDefault;

function bossComingShow() {
  bossHeadTwitch();
  $coming.classList.add('boss-coming__show');
}

function bossHeadTwitch() {
  $bossHead.style.animationDuration = `${wavesBeforeComing}s`;
}

function bossComing() {
  wavesBeforeComing -= 1;

  bossHeadMove();
  bossHeadTwitch();

  if (wavesBeforeComing === 0) {
    bossCame();
  }
}

function bossHeadMove() {
  $progress.style.transform = `translateX(-${wavesBeforeComing * shiftX}%)`;
}

function bossCame() {
  document.dispatchEvent(eventBossCame); // слушает ticker и он вызывает босса
}

function bossGone() {
  wavesBeforeComing = wavesBeforeComingDefault;

  bossHeadMove();
  bossHeadTwitch();
}

document.addEventListener('startGame', bossComingShow);
document.addEventListener('bossComing', bossComing);
document.addEventListener('bossGone', bossGone);
