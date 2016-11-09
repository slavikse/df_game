let receivedDamage;

function setReceivedDamage(e) {
  receivedDamage = e.receivedDamage;
}

function getReceivedDamage() {
  return receivedDamage;
}

document.addEventListener('receivedDamage', setReceivedDamage);

export default getReceivedDamage;
