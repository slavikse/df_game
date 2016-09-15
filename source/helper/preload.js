const $preload = $('.preload'); // для предзагрузки всех ресурсов

function preloadSound(allResourceSound) {
  let fragment = document.createDocumentFragment();

  allResourceSound.forEach(sound => {
    let audio = document.createElement('audio');
    audio.src = sound;

    fragment.appendChild(audio);
  });

  raf($preload.appendChild(fragment));
}

function preloadImage(allResourceImage) {
  let fragment = document.createDocumentFragment();

  allResourceImage.forEach(image => {
    let div = document.createElement('div');
    div.style.backgroundImage = `url(${image})`;

    fragment.appendChild(div);
  });

  raf($preload.appendChild(fragment));
}

export {
  preloadSound,
  preloadImage
};

/*
* TODO перейти на new Audio . проверить работает ли вообще....
* */