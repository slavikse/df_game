# Мученик - машина, а не человек!
## /!\ UNIX ONLY /!\ Автоматизация задач для веб проектов.

**В составе:**
npm scripts, gulp@4, posthtml, postcss, webpack@2 + babel = ❤ es2015, png/jpg/svg/mp3 sprite, image resize, live reload, minify, rev, zip, github/firebase hosting

# Установка
```sh
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - &&
sudo apt install ffmpeg &&
git clone https://github.com/slavikse/martyr.git my_martyr &&
cd my_martyr && npm i && node run dev
```
# Запуск
development: ```node run dev```   
production: ```node run prod```   
deploy git: ```node run git```   
deploy fb: ```node run fb```   
tunnel: ```node run tunnel```   

# Правила модульности
* **Module**: это директория | вкладывать только под модули | поиск: ./ и source/   
  **use:** module_name/{module_name.css,module_name.html,module_name.js}   

* **View use:** \<include src='module_name/module_name.html'\>\</include\>   

* **Style**: BEM нотация | имя модуля === имя блока   
  **use:** .module-name .module-name__text {}   

* **Script**: babel, es2015   

* **Image**: в модуле: ```module_name/image/module_name_cat.jpg```  
  **use:** ```image/module_name_cat.jpg```
  
* **Resize**: в модуле: ```module_name/resize/module_name_cat.jpg```   
  Из большого изображения создаются 2 меньших: для tablet и mobile    
  **use:** ```image/module_name_cat{`original`,_table,_mobile}.jpg```
  
* **Sprite png**: в модуле: ```module_name/sprite/```   
  **use:** ```temp/sprite.png.css```

* **Sprite svg**: в модуле: ```module_name/svg/```   
  **use:** ```temp/sprite.css``` и ```temp/sprite.symbol.html```

* **Audio**: в модуле: ```module_name/audio/```   
  **use:** ```audio/module_name_cat.mp3```

* **Audios**: в модуле: ```module_name/audios/```   
  **use:** ```temp/audio/audios.json```   

* **Font**: расположение ```font/```   

```
source/
    helper/
        audio/
        audios/
        font/
        image/
        resize/
    header/
        audio/
        audios/
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
