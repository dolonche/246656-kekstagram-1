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
  var pictureItem = document.querySelectorAll('.picture');
  var galleryClose = gallery.querySelector('.gallery-overlay-close');
  for (var k = 0; k < pictureItem.length; k++) {
    (function (index) {
      pictureItem[k].addEventListener('click', function (event) {
        event.preventDefault();
        gallery.classList.remove('hidden');
        renderGalleryItem(window.data.picData()[index + 1]);
      });
    })(k);
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
