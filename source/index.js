import loopCreateCat from './cat/cat';
import loopCreateEnemy from './enemy/enemy';
import noise from './helper/noise';
import './shoot/shoot';
import './panel/panel';
import './revolver/revolver';
// import {preloadSound, preloadImage} from './helper/preload';

loopCreateCat();
loopCreateEnemy();


window.god = false;

window.addEventListener('keyup', e => {
  if (e.keyCode === 71) { // G
    window.god = true;
    noise(['sound/god_mode.mp3']);
  }
});


/** Support external SVG: IE 9-11 && Edge 12- */
// import svg4everybody from 'libs/svg4everybody';
// svg4everybody();

/**
 * A responsive image polyfill for <picture>, srcset, sizes: IE11- [~12kb minify]
 * При использовании webp поправить конфиг в сборке изображений
 */
// import picturefill from 'picturefill';
// picturefill();

/*
 import template from 'underscore.template';
 template('Hello, <%= name %>')({name: 'Paul'});
 var list = "<% _.each(people, function(name) { %> <li><%= name %></li> <% }); %>";
 template(list, {people : ['moe', 'curly', 'larry']}); // вернёт "<li>moe</li><li>curly</li><li>larry</li>"
 */
