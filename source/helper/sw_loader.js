const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'production') {
  swLoader();
}

function swLoader() {
  if ('serviceWorker' in navigator) {
    navigator
    .serviceWorker
    .register('sw.js')
    .then(registration)
    .catch(error);
  }
}

function registration(e) {
  if (e.installing) {
    console.log('Service worker installing');
  } else if (e.waiting) {
    console.log('Service worker installed');
  } else if (e.active) {
    console.log('Service worker active');
  }
}

function error(err) {
  console.log(`Registration failed with ${err}`);
}
