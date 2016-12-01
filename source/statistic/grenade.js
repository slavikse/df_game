let grenade;

function setGrenade(e) {
  grenade = e.grenadeCount;
}

function getGrenade() {
  return grenade;
}

document.addEventListener('grenadeCount', setGrenade);

export default getGrenade;
