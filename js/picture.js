'use strict';
(function () {
  var pictureElement = document.querySelector('.pictures');
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var fragment = document.createDocumentFragment();
  var filters = document.querySelector('.filters');
  var filtersButton = filters.querySelectorAll('.filters-radio');
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
    picturesNew = pictures;
    pictureElement.addEventListener('click', onClickPicture);
    if (filters.classList.contains('filters-inactive')) {
      filters.classList.remove('filters-inactive');
    }
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
  var picturesNew = [];
  var shuffle = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };
  var sortTypes = function (type, data) {
    if (type === 'filter-popular') {
      return data.sort(function (a, b) {
        if (a.likes < b.likes) {
          return 1;
        } else if (a.likes > b.likes) {
          return -1;
        } else {
          return a.comments.length - b.comments.length;
        }
      });
    } else if (type === 'filter-discussed') {
      return data.sort(function (a, b) {
        if (a.comments.length < b.comments.length) {
          return 1;
        } else if (a.comments.length > b.comments.length) {
          return -1;
        } else {
          return a.likes - b.likes;
        }
      });
    } else if (type === 'filter-random') {
      return shuffle(data);
    }
    return picturesNew;
  };
  var onButtonSortClick = function (e) {
    var picturesNode = document.querySelectorAll('.picture');
    var copyData = picturesNew.slice(0);
    var type = e.target.id;
    copyData = sortTypes(type, copyData);
    for (var i = 0; i < picturesNode.length; i++) {
      picturesNode[i].remove();
    }
    window.debounce(function () {
      successHandler(copyData);
    });
  };
  for (var i = 0; i < filtersButton.length; i++) {
    filtersButton[i].addEventListener('click', onButtonSortClick);
  }
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
