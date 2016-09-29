# Для чего?  
/!\ Мученик - машина, а не человек! Современный стек технологий для сборки веб проектов /!\    
**Под капотом:**
gulp, webpack + babel = ❤ es2015, postcss, png + svg sprite, image resize, browser-sync, версионирование, audio спрайт + minify (ffmpeg), zip.

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
* **Module**: не вкладывать остальное сделает fs   
  *Имя папки (module_name) === Имена файлов в папке:*   
  **ex:** module_name/{module_name.html,module_name.css,module_name.js}

* **View**: логическая вложенность   
  **ex:** @include('module_name/module_name.html')   

* **Style**: каскад + не вкладывать = ❤ инкапсуляция стилей   
  **ex:** .module-name .text {...}

* **Script**: webpack, babel 

* **Image**: расположение ```image/```  
  **ex:** подключаются: ``` src="image/moduleName_cat.jpg" ```
  
* **Resize**: расположение ```resize/```   
  Из большого изображения создаются 2 меньших: для _tablet и _mobile    
  
* **Sprite png**: расположение ```sprite/```   
  **ex:** классы для использования в ```temp/sprite.png.css```

* **Sprite svg**: расположение ```svg/```   
  **ex:** стили для использования в ```temp/sprite.css```   
    и пример использования ```temp/sprite.symbol.html```

* **Audio**: расположение ```audio/```

* **Audio Sprite**: расположение ```audio_sprite/```   
  **ex:** информация о спрайте ```temp/audio/audio_sprite.json```

* **Font**: расположение ```font/```   

```
source/
    font/               
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
```
# Запустить туннель
```sh
$ NODE_ENV=tunnel gulp
```
# MIT License
