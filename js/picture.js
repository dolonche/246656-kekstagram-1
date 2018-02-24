'use strict';
(function () {
  var pictureElement = document.querySelector('.pictures');
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var fragment = document.createDocumentFragment();
  var renderPictureElement = function (description) {
    var pictureTemplate = window.data.picturesTemplate.cloneNode(true);
    var pictureImg = pictureTemplate.querySelector('.picture img');
    var pictureComments = pictureTemplate.querySelector('.picture-comments');
    var pictureLikes = pictureTemplate.querySelector('.picture-likes');
    pictureImg.src = description.url;
    pictureComments.textContent = description.comments.length;
    pictureLikes.textContent = description.likes;
    return pictureTemplate;
  };
  var renderGalleryItem = function (picture) {
    var galleryTemplate = window.data.picturesTemplate.cloneNode(true);
    var galleryImage = galleryOverlay.querySelector('.gallery-overlay-image');
    var likesCount = galleryOverlay.querySelector('.likes-count');
    var commentsCount = galleryOverlay.querySelector('.comments-count');
    galleryImage.src = picture.url;
    likesCount.textContent = picture.likes;
    commentsCount.textContent = picture.comments.length;
    return galleryTemplate;
  };
  var successHandler = function (pictures) {
    for (var i = 0; i < 25; i++) {
      fragment.appendChild(renderPictureElement(pictures[i]));
    }
    pictureElement.appendChild(fragment);
    pictureElement.addEventListener('click', onClickPicture);
    function onClickPicture(e) {
      e.preventDefault();
      var target = e.target;
      for (var k = 0; k < pictureElement.children.length; k++) {
        if (pictureElement.children[k].querySelector('img') === target) {
          galleryOverlay.classList.remove('hidden');
          renderGalleryItem(pictures[k]);
        }
      }
    }
  };
  window.backend.load(successHandler, window.backend.errorHandler);
  var galleryClose = galleryOverlay.querySelector('.gallery-overlay-close');
  var closePopup = function () {
    galleryOverlay.classList.add('hidden');
  };
  galleryClose.addEventListener('click', closePopup);
  galleryClose.addEventListener('keydown', function (e) {
    if (e.keyCode === window.data.ENTER_KEYCODE) {
      closePopup();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.keyCode === window.data.ESC_KEYCODE) {
      closePopup();
    }
  });
})();
