'use strict';
(function () {
  var MIN_LIKES = 1;
  var MAX_LIKES = 200;
  var pictures = [];
  var photoComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !'];
  var pictureElement = document.querySelector('.pictures');
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var fragment = document.createDocumentFragment();
  var randomComments = function (commentsArr) {
    var commentsValue = Math.floor(Math.random() * (commentsArr.length));
    return commentsValue;
  };
  var randomLikes = function (minLikes, maxLikes) {
    var likesValue = Math.floor(Math.random() * (maxLikes - minLikes)) + minLikes;
    return likesValue;
  };
  var createPicturesData = function (objectValue) {
    for (var i = 0; i <= objectValue; i++) {
      var photo = {
        url: 'photos/' + i + '.jpg',
        likes: randomLikes(MIN_LIKES, MAX_LIKES),
        comments: randomComments(photoComments),
      };
      pictures.push(photo);
    }
    return pictures;
  };
  var renderPictureElement = function (description) {
    var pictureTemplate = window.data.picturesTemplate.cloneNode(true);
    var pictureImg = pictureTemplate.querySelector('.picture img');
    var pictureComments = pictureTemplate.querySelector('.picture-comments');
    var pictureLikes = pictureTemplate.querySelector('.picture-likes');
    pictureImg.src = description.url;
    pictureComments.textContent = description.comments;
    pictureLikes.textContent = description.likes;
    return pictureTemplate;
  };
  var renderPictures = function () {
    for (var i = 1; i < pictures.length; i++) {
      fragment.appendChild(renderPictureElement(pictures[i]));
    }
  };
  createPicturesData(25);
  renderPictures();
  pictureElement.appendChild(fragment);
  var renderGalleryItem = function (picture) {
    var galleryTemplate = window.data.picturesTemplate.cloneNode(true);
    var galleryImage = galleryOverlay.querySelector('.gallery-overlay-image');
    var likesCount = galleryOverlay.querySelector('.likes-count');
    var commentsCount = galleryOverlay.querySelector('.comments-count');
    galleryImage.src = picture.url;
    likesCount.textContent = picture.likes;
    commentsCount.textContent = picture.comments;
    return galleryTemplate;
  };
  var galleryClose = galleryOverlay.querySelector('.gallery-overlay-close');
  pictureElement.addEventListener('click', onClickPicture);
  function onClickPicture(e) {
    e.preventDefault();
    var target = e.target;
    for (var i = 0; i < pictureElement.children.length; i++) {
      if (pictureElement.children[i].querySelector('img') === target) {
        galleryOverlay.classList.remove('hidden');
        renderGalleryItem(pictures[i + 1]);
      }
    }
  }
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
