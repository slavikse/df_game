let costs;

function setCosts(e) {
  costs = e.costs;
}

function getCosts() {
  return costs;
}

document.addEventListener('costs', setCosts);

export default getCosts;
