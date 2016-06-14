const vendors = [ // [0]:require?, [1]:pathDev, [2]:pathProd
  [true, // normalize
    'node_modules/normalize.css/normalize.css'],
  [false, // ajax
    'node_modules/@fdaciuk/ajax/dist/ajax.min.js'],
  [false, // lazyload image
    'node_modules/layzr.js/dist/layzr.min.js'],

  [true, // reset css
    'node_modules/my_libs/style/reset.css'],
  [false, // dom js
    'node_modules/my_libs/script/dom.js'],
  [false, // lazyload css
    'node_modules/my_libs/lazy_load/lazy_load.css'],
  [false, // lazyload js
    'node_modules/my_libs/lazy_load/lazy_load.js'],
  [false, // is_numeric
    'node_modules/my_libs/script/is_numeric.js'],
  [false, // in_viewport
    'node_modules/my_libs/script/in_viewport/in_viewport.js'],
  [false, // support css
    'node_modules/my_libs/script/support_css/support_css.js'],
  [false, // carousel
    'node_modules/my_libs/script/carousel/carousel.js'],

  //=== ?lazy ===
  [false,
    '_script_path_.js?lazy']
];

let lib = {
  style: [
    'source/**/lib/*.css',
    '!source/**/lib/_*'
  ],
  script: [
    'source/**/lib/*.js',
    '!source/**/lib/_*'
  ],
  lazy: [
    'source/**/lazy/*.{css,js}',
    '!source/**/lazy/_*'
  ]
};

/**
 * Сортирует пути по расширению и добавляет в соответствующую секцию
 * @param path {String} путь до библиотеки в npm или в папку /lib
 */
let addLibByType = (path) => {
  if (/css$/.test(path)) {
    lib.style.push(path)
  } else if (/js$/.test(path)) {
    lib.script.push(path)
  } else if (/\?lazy$/.test(path)) {
    lib.lazy.push(path.replace(/\?lazy$/, ''))
  }
};

const production = process.env.NODE_ENV === 'production';

/**
 * Сортируем пути к библиотекам и добавляем в экспортируемую переменную lib
 * @param vendors {Array} пути к библиотекам из npm
 * @param vendor {Array} путь к библиотеке из npm
 */
vendors.forEach((vendor) => {
  if (vendor[0]) { // require?
    let path = production && vendor[2] ? vendor[2] : vendor[1];
    addLibByType(path)
  }
});

export default lib
