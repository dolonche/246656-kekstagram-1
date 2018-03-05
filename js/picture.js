'use strict';
(function () {
  var pictureElement = document.querySelector('.pictures');
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var fragment = document.createDocumentFragment();
  var filters = document.querySelector('.filters');
  var filtersButton = filters.querySelectorAll('.filters-radio');
  var galleryClose = galleryOverlay.querySelector('.gallery-overlay-close');
  var picturesNew = [];

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
    pictures.forEach(function (item, i, arr) {
      fragment.appendChild(renderPictureElement(arr[i]));
    });
    pictureElement.appendChild(fragment);
    pictureElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      var target = evt.target;
      for (var k = 0; k < pictureElement.children.length; k++) {
        if (pictureElement.children[k].querySelector('img') === target) {
          galleryOverlay.classList.remove('hidden');
          renderGalleryItem(pictures[k]);
        }
      }
    });
    pictureElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ENTER_KEYCODE) {
        evt.preventDefault();
        var target = evt.target;

        for (var k = 0; k < pictureElement.children.length; k++) {
          if (pictureElement.children[k] === target) {
            galleryOverlay.classList.remove('hidden');
            renderGalleryItem(pictures[k]);
          }
        }
      }
    });
    if (filters.classList.contains('filters-inactive')) {
      filters.classList.remove('filters-inactive');
    }
    picturesNew = pictures;
  };

  window.backend.load(successHandler, window.backend.errorHandler);

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

  var onButtonSortClick = function (evt) {
    var picturesNode = document.querySelectorAll('.picture');
    var copyData = picturesNew.slice(0);
    var type = evt.target.id;
    copyData = sortTypes(type, copyData);
    for (var i = 0; i < picturesNode.length; i++) {
      picturesNode[i].remove();
    }
    window.debounce(function () {
      successHandler(copyData);
    });
  };

  filtersButton.forEach(function (item, i, arr) {
    arr[i].addEventListener('click', onButtonSortClick);
  });

  var closePopup = function () {
    galleryOverlay.classList.add('hidden');
  };

  galleryClose.addEventListener('click', function () {
    closePopup();
    galleryClose.removeEventListener('click', closePopup());
  });

  galleryClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      closePopup();
      galleryClose.removeEventListener('keydown', closePopup());
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      closePopup();
      galleryClose.removeEventListener('keydown', closePopup());
    }
  });
})();
