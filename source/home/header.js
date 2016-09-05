import {$, on, raf} from 'libs/utils';

let header = $('.header'),
  nav = $('.nav', header),
  active = nav.children[0];

on(nav, 'click', e => {
  let target = e.target;

  if (!target.classList.contains('link')) {
    return;
  }

  raf(toggleActive.bind(null, target));
});

function toggleActive(current) {
  active.classList.remove('active');
  active = current;
  current.classList.add('active');
}
