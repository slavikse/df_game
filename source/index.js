import preloadResources from './resource_preload/resource_preload.js';
import './start_screen/start_screen.js';
import noise from './helper/noise.js';
import './result/result.js';

preloadResources(); // по загрузки создаст событие, которое слушает стартовый экран

/** god mod */
window.god = false;

window.addEventListener('keyup', e => {
  if (e.keyCode === 71) { // G
    window.god = true;
    noise('audio/god_mode.mp3');
  }
});


/** Support external SVG: IE 9-11 && Edge 12- */
// import svg4everybody from 'libs/svg4everybody';
// svg4everybody();

/**
 * A responsive sprite polyfill for <picture>, srcset, sizes: IE11- [~12kb minify]
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
