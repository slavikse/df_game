const $coming = document.querySelector('.boss-coming');
const $progress = $coming.querySelector('.boss-progress');
const $bossHead = $coming.querySelector('.boss-head');
const wavesBeforeComingDefault = 2 + 1; // волны + после магаза (+1)
const shiftX = (100 / wavesBeforeComingDefault).toFixed(2);
const eventBoss = new Event('boss');

let wavesBeforeComing = wavesBeforeComingDefault;

function bossComingShow() {
  bossHeadTwitch();
  $coming.classList.add('boss-coming-show');
}

function bossComing() {
  wavesBeforeComing -= 1;

  bossHeadMove();
  bossHeadTwitch();

  if (wavesBeforeComing === 0) {
    document.removeEventListener('bossComing', bossComing);
    document.dispatchEvent(eventBoss);
  }
}

function bossHeadMove() {
  $progress.style.transform = `translateX(-${wavesBeforeComing * shiftX}%)`;
}

function bossHeadTwitch() {
  $bossHead.style.animationDuration = `${wavesBeforeComing}s`;
}

document.addEventListener('startGame', bossComingShow);
document.addEventListener('bossComing', bossComing);
