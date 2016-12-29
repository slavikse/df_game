# Для чего?  
/!\ Мученик - машина, а не человек! Современный стек технологий для сборки веб проектов /!\    
**В составе:**
npm scripts, gulp@4, postcss, webpack@2 + babel = ❤ es2015, png/jpg/svg/mp3 sprite, image resize, minify, live reload, rev, zip, github/firebase hosting.

# Установка
```sh
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - &&
sudo apt install ffmpeg &&
git clone https://github.com/slavikse/martyr.git my_martyr &&
cd my_martyr && npm i && node run dev
```
# Запуск
dev: ```$ node run dev```   
production: ```$ node run prod```   
deploy git: ```$ node run git```   
deploy fb: ```$ node run fb```   
tunnel: ```$ node run tunnel```   

# Модульность
**Правила**:   
* **Module**:   
  \#1: директория == *модуль*   
  \#2: *не вкладывать* модули, линейное расположение в fs   
  \#3: *единственный корневой элемент* в view и класс в style (scope в модуле)   
  \#4: для манипуляций с элементом в script, *добавлять в конце -js* к классу    
  *Имя модуля (module_name) === Имена файлов в модуле:*   
  **ex:** module_name/{module_name.html,module_name.css,module_name.js}   

* **View**: @include   
  **ex:** @include('./module_name/module_name.html')   

* **Style**: каскад и правило **Module** = ❤ инкапсуляция стилей   
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
  **ex:** подключение: ```audio/module_name_cat.mp3```

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
# MIT License
