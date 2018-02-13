'use strict';
(function () {
  var gallery = document.querySelector('.gallery-overlay');
  var renderGalleryItem = function (picture) {
    var galleryElement = window.data.picturesTemplate.cloneNode(true);
    var galleryImage = gallery.querySelector('.gallery-overlay-image');
    var likesCount = gallery.querySelector('.likes-count');
    var commentsCount = gallery.querySelector('.comments-count');
    galleryImage.src = picture.url;
    likesCount.textContent = picture.likes;
    commentsCount.textContent = picture.comments;
    return galleryElement;
  };
  var pictureElement = document.querySelector('.pictures');
  var galleryClose = gallery.querySelector('.gallery-overlay-close');
//  for (var k = 0; k < pictureItem.length; k++) {
//    (function (index) {
//      pictureItem[k].addEventListener('click', function (event) {
//        event.preventDefault();
//        gallery.classList.remove('hidden');
//        renderGalleryItem(window.data.picData()[index + 1]);
//      });
//    })(k);
//  }
  pictureElement.addEventListener('click', onClickPicture)
  function onClickPicture (e) {
  e.preventDefault()
  var target = e.target;


  for (var i = 0; i < pictureElement.children.length; i++) {
    if (pictureElement.children[i].querySelector('img') === target) {

      // gallery.appendChild(renderGalleryItem(pictures[i]));
      console.log(window.data.picData()[i + 1]);
      gallery.classList.remove('hidden');
      renderGalleryItem(window.data.picData()[i + 1]);// при клике получаю обьект, по которому кликнул пользователь, твоя задача - этот обьект передать в функцию, которая рендерит картинку с оверлеем
    }
  }
}
  var closePopup = function () {
    gallery.classList.add('hidden');
  };
  galleryClose.addEventListener('click', closePopup);
  galleryClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      closePopup();
    }
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      closePopup();
    }
  });
})();
