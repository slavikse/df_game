# Для чего?
/!\ Быстрый старт с компонентной системой разработки проекта /!\   

**Под капотом:**
gulp, pug, stylus, webpack + babel = ❤ es2015, png + svg sprite, image resize, browser-sync, версионирование, minify, zip.

# Установка
```sh
$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
$ sudo npm i -g gulp-cli &&
    git clone https://github.com/slavikse/martyr.git my_project &&
    cd my_project && npm i
```
# Запуск
Разработка: ```$ gulp```   
Продакшн: ```$ NODE_ENV=production gulp```

# Модульность
**Правила сборки**:   
* **Module**: НЕ вкладывать! Тем самым ФС отследит уникальность имени папки.   
  *Имя папки (module_name) === Имени файлов в папке:*   
  **ex:** module_name/{module_name.pug,module_name.styl,module_name.js}

* **View**: логическая вложенность.   
  **ex:** include module_name/module_name.pug   

* **Style**: импортятся локально.   
    Каскад + правило НЕ вкладывать! = ❤ инкапсуляция стилей.   
  **ex:** .module-name .text {...}

* **Script**: импортятся локально + npm, бабелятся и пакуются.

* **Image**: именование moduleName_imageName и кладуться в ```image/```  
  **ex:** подключаются: ``` src="image/moduleName_cat.jpg" ```
  
* **Resize**: именование moduleName_imageName и кладуться в ```resize/```.   
  Из большого изображения создаются 2 меньших: для tablet и mobile.    
  **ex:** подключаются (с layzr.js):  
    data-srcset="image/resp_mobile.jpg 544w, image/resp_tablet.jpg 992w")   

* **Sprite png**: именование moduleName_imageName и кладуться в ```sprite/```   
  **ex:** стили для использования в ```public/sprite.png.css```

* **Sprite svg**: именование moduleName_imageName и кладуться в ```svg/```   
  **ex:** стили для использования в ```public/sprite.css```   
    и пример использования ```public/sprite.symbol.html```
    
* **Font**: шрифты кладутся в ```font/```   

```
source/
    header/
        image/
        resize/
        sprite/
        svg/
        font/
        header.html
        header.css
        header.js
```
# Запустить туннель
```sh
$ NODE_ENV=tunnel gulp
```
