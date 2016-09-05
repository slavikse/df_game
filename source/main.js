import './home/header';

/**
 * Support external SVG: IE 9-11 && Edge 12-
 */
import svg4everybody from 'libs/svg4everybody';
svg4everybody();

/**
 * A responsive image polyfill for <picture>, srcset, sizes: IE11- [~12kb minify]
 * При использовании webp поправить конфиг в сборке изображений
 */
// import picturefill from 'picturefill';
// picturefill();
