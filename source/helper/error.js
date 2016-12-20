import fb from './fb';

const db = fb.database();

window.onerror = error;

function error(msg, url, lineNo, columnNo, error) {
  const date = Date.now();

  db.ref(`error/${date}`).set({msg, url, lineNo, columnNo, error});
}
