# Для чего?
/!\ Быстрый старт с компонентной системой разработки проекта /!\   

**Под капотом:**
gulp, postcss, es2015, webpack, png + svg sprite, image resize, browser-sync, minify, zip.

# Установка
```sh
$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
$ sudo npm i -g gulpjs/gulp-cli#4.0 &&
    git clone https://github.com/slavikse/martyr.git my_project &&
    cd my_project && npm i
```
# Запуск
```
$ gulp
```
# Модульность
**Правила сборки**:   
* **Module**: НЕ вкладывать! Тем самым ФС отследит уникальность имени папки.   
  *Имя папки (moduleName) === Имени файлов в папке:*   
  **ex:** moduleName/{moduleName.html,moduleName.css,moduleName.js}

* **View**: логическая вложенность с помощью rigger.   
  **ex:** //= moduleName/moduleName.html   

* **Style**: импортятся + npm. каскад + правило №1 = инкапсуляция стилей.   
  **ex:** .moduleName .text {...}

* **Script**: бабелятся и пакуются + npm.

* **Image**: именование moduleName_imageName и кладуться в ```image/```  
  **ex:** подключаются: ``` src="image/moduleName_cat.jpg" ```
  
* **Resize**: именование moduleName_imageName и кладуться в ```resize/```.   
  Из большого изображения создаются 2 меньших: для tablet и mobile.    
  **ex:** подключаются (с layzr.js):  
    data-srcset="image/resp_mobile.jpg 544w, image/resp_tablet.jpg 992w")   

* **Sprite png**: именование moduleName_imageName и кладуться в ```sprite/```   
  **ex:** стили для использования в ```./temp/sprite.css```

* **Sprite svg**: именование moduleName_imageName и кладуться в ```svg/```   
  **ex:** стили для использования в ```./public/svg/sprite.css```

* **Font**: кладуться в ```font/```

```
source/
  client/
    header/
      font/
      image/
      resize/
      sprite/
      svg/
      header.html
      header.css
      header.js
```
# Запустить туннель
**NODE_ENV=tunnel gulp**
