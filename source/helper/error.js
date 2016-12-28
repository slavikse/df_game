import fb from './fb';

const db = fb.database();

function error(msg, url, lineNo, columnNo, error) {
  const date = new Date().toLocaleString('ru');
  db.ref(`error/${date.replace(/\./g, ':').replace(', ', ':')}`)
  .set({
    msg,
    url,
    lineNo,
    columnNo,
    error
  });
}

window.onerror = error;
