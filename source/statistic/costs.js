let costsCount;

function costsSet(e) {
  costsCount = e.costs;
}

function costsGet() {
  return costsCount;
}

document.addEventListener('costs', costsSet);

export default costsGet;
