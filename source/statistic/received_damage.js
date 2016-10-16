function receivedDamageSet(e) {
  console.log(`Получено урона: ${e.receivedDamage}`);
}

document.addEventListener('receivedDamage', receivedDamageSet);
