let firstAidUse;

function firstAidUseSet(e) {
  firstAidUse = e.firstAidUse;
}

function firstAidUseGet() {
  return firstAidUse;
}

document.addEventListener('firstAidUse', firstAidUseSet);

export default firstAidUseGet;
