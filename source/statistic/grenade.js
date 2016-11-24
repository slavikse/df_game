let grenade;

function setGrenade(e) {
  grenade = e.grenadeCountTotal;
}

function getGrenade() {
  return grenade;
}

document.addEventListener('grenadeCount', setGrenade);

export default getGrenade;
