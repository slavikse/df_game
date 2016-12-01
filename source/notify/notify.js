const $notify = document.querySelector('.notify');

/**
 * Принимает объект уведомления со следующими свойствами:
 * @param note.type стили уведомления (info, warn, error)
 * @param note.message текст уведомления
 */
function notify(note) {
  const noteElement = document.createElement('div');
  const noteHtml = getNoteHtml(note);

  noteElement.classList.add('note');
  noteElement.insertAdjacentHTML('afterBegin', noteHtml);
  $notify.appendChild(noteElement);
  setTimeout(noteHide.bind(null, noteElement), 2000);
}

function getNoteHtml(note) {
  return `
    <div class='${note.type}'>
      ${note.message}
    </div>
  `;
}

function noteHide(noteElement) {
  noteElement.classList.add('hide');
  setTimeout(noteRemove.bind(null, noteElement), 400);
}

function noteRemove(noteElement) {
  noteElement.remove();
}

export default notify;
