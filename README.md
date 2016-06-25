# Для чего?
/!\ Быстрый старт с компонентной системой разработки проекта /!\   

**Под капотом:**
gulp, postcss, babel, webpack, png + svg sprite, image resize, browser-sync, версионирование, minify, zip.

# Установка
```sh
$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
$ sudo npm i -g gulp-cli &&
    git clone https://github.com/slavikse/martyr.git my_project &&
    cd my_project && npm i
```
# Запуск
```sh
$ gulp
``` 
# Модульность
**Правила сборки**:   

* **Module**: НЕ вкладывать! Тем самым ФС отследит уникальность имени папки.   
  *Имя папки (moduleName) === Имени файлов в папке плюс расширение:*   
  **ex:** moduleName/{moduleName.html,moduleName.css,moduleName.js}

* **View**: логическая вложенность с помощью rigger.   
  **ex:** //= moduleName/moduleName.html   

* **Style**: импортятся локально, а так же из npm.   
    Каскад + правило НЕ вкладывать! = инкапсуляция стилей.   
  **ex:** .moduleName .text {...}

* **Script**: ипрортятся локально, а так же из npm, бабелятся и пакуются.

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

```
source/
  client/
    header/
      image/
      resize/
      sprite/
      svg/
      header.html
      header.css
      header.js
```
# Запустить туннель
```sh
$ NODE_ENV=tunnel gulp
```
