import swLoader from './swLoader';
import './helper/prepare_audio_sprite';
import './resource_preload/resource_preload';
import './start_screen/start_screen';
import './cat/cat';
import './enemy/enemy';
import './panel/panel';
import './result/result';

const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'production') {
  swLoader();
}

// загрузив игру, создаст событие, которое слушает стартовый экран
