const $notify = document.querySelector('.notify');

/**
 * Принимает объект уведомления со следующими свойствами:
 * @param note.type стили уведомления (info, warn, error)
 * @param note.message текст уведомления
 * example: notify({type: 'info', message: '+100$'});
 */
function notify(note) {
  const noteElement = document.createElement('div');
  const noteHtml = getNoteHtml(note);

  noteElement.classList.add('notify__note');
  noteElement.insertAdjacentHTML('afterBegin', noteHtml);

  $notify.appendChild(noteElement);
  setTimeout(noteHide.bind(null, noteElement), 2000);
}

function getNoteHtml(note) {
  return `<div class='notify__${note.type}'>${note.message}</div>`;
}

function noteHide(noteElement) {
  noteElement.classList.add('notify__hide');
  setTimeout(noteRemove.bind(null, noteElement), 400);
}

function noteRemove(noteElement) {
  noteElement.remove();
}

export default notify;
