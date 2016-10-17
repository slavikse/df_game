let receivedDamage;

function receivedDamageSet(e) {
  receivedDamage = e.receivedDamage;
}

function receivedDamageGet() {
  return receivedDamage;
}

document.addEventListener('receivedDamage', receivedDamageSet);

export default receivedDamageGet;
