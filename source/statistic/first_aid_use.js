let firstAidUse;

function setFirstAidUse(e) {
  firstAidUse = e.firstAidUse;
}

function getFirstAidUse() {
  return firstAidUse;
}

document.addEventListener('firstAidUse', setFirstAidUse);

export default getFirstAidUse;
