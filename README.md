# Для чего?  
/!\ Мученик - машина, а не человек! Современный стек технологий для сборки веб проектов /!\    
**В составе:**
gulp4, webpack + babel = ❤ es2015, postcss, png/svg/audio sprite, image resize, live reload, rev, zip, minify.

# Установка
```sh
$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
$ sudo apt install ffmpeg
$ sudo npm i -g gulp-cli &&
    git clone https://github.com/slavikse/martyr.git my_project &&
    cd my_project && npm i
```
# Запуск
Разработка: ```$ gulp```   
Продакшн: ```$ NODE_ENV=production gulp```

# Модульность
**Правила**:   
* **Module**: не вкладывать, остальное сделает fs (#1).   
  *Имя папки (module_name) === Имена файлов в папке:*   
  **ex:** module_name/{module_name.html,module_name.css,module_name.js}

* **View**: модульность за счет @include.   
  **ex:** @include('./module_name/module_name.html')   

* **Style**: каскад + не вкладывать (#1) = ❤ инкапсуляция стилей   
  **ex:** .module-name .text {...}   

* **Script**: webpack, babel   

* **Image**: в модуле: ```module_name/image/module_name_cat.jpg```  
  **ex:** подключение: ```image/module_name_cat.jpg```
  
* **Resize**: в модуле: ```module_name/resize/module_name_big_cat.jpg```   
  Из большого изображения создаются 2 меньших: для tablet и mobile    
  **ex:** подключение: ```image/module_name_cat{_big,_table,_mobile}.jpg```
  
* **Sprite png**: в модуле: ```module_name/sprite/```   
  **ex:** классы для использования: ```temp/sprite.png.css```

* **Sprite svg**: в модуле: ```module_name/svg/```   
  **ex:** стили для использования: ```temp/sprite.css```   
    и пример использования: ```temp/sprite.symbol.html```

* **Audio**: в модуле: ```module_name/audio/```

* **Audio Sprite**: в модуле: ```module_name/audio_sprite/```   
  **ex:** информация о спрайте: ```temp/audio/audio_sprite.json```

* **Font**: расположение ```font/```   

```
source/
    font/
    image/
    resize/
    helper/
    header/
        audio/
        audio_sprite/
        image/
        resize/
        sprite/
        svg/
        header.css
        header.html
        header.js
    index.css
    index.html
    index.js
```
# Запустить туннель
```sh
$ NODE_ENV=tunnel gulp
```
# MIT License
