const $coming = document.querySelector('.boss-coming');
const $progress = $coming.querySelector('.boss-progress');
const $bossHead = $coming.querySelector('.boss-head');
const wavesBeforeComingDefault = 2 + 1; // волны +1 (после магаза)
const shiftX = (100 / wavesBeforeComingDefault).toFixed(2);
const eventBoss = new Event('boss');

let wavesBeforeComing = wavesBeforeComingDefault;

function bossComingShow() {
  bossHeadTwitch();
  $coming.classList.add('boss-coming-show');
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
  document.removeEventListener('bossComing', bossComing);
  document.dispatchEvent(eventBoss);
}

document.addEventListener('startGame', bossComingShow);
document.addEventListener('bossComing', bossComing);
