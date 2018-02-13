'use strict';
(function () {
  var MIN_LIKES = 1;
  var MAX_LIKES = 200;
  var pictures = [];
  var photoComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !'];
  var picturesList = document.querySelector('.pictures');
  var gallery = document.querySelector('.gallery-overlay');
  var fragment = document.createDocumentFragment();
  var randomComments = function (commentsArr) {
    var commentsValue = Math.floor(Math.random() * (commentsArr.length));
    return commentsValue;
  };
  var randomLikes = function (minLikes, maxLikes) {
    var likesValue = Math.floor(Math.random() * (maxLikes - minLikes)) + minLikes;
    return likesValue;
  };
  var createPicturesData = function () {
    for (var i = 0; i <= 25; i++) {
      var photo = {
        url: 'photos/' + i + '.jpg',
        likes: randomLikes(MIN_LIKES, MAX_LIKES),
        comments: randomComments(photoComments),
      };
      pictures.push(photo);
    }
    return pictures;
  };
  var renderPictureElement = function (descrip) {
    var pictureElement = window.data.picturesTemplate.cloneNode(true);
    var pictureImg = pictureElement.querySelector('.picture img');
    var pictureComments = pictureElement.querySelector('.picture-comments');
    var pictureLikes = pictureElement.querySelector('.picture-likes');
    pictureImg.src = descrip.url;
    pictureComments.textContent = descrip.comments;
    pictureLikes.textContent = descrip.likes;
    return pictureElement;
  };
  var renderPictures = function () {
    for (var i = 1; i < pictures.length; i++) {
      fragment.appendChild(renderPictureElement(pictures[i]));
    }
  };
  createPicturesData();
  renderPictures();
  picturesList.appendChild(fragment);
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
  pictureElement.addEventListener('click', onClickPicture);
  function onClickPicture(e) {
    e.preventDefault();
    var target = e.target;
    for (var i = 0; i < pictureElement.children.length; i++) {
      if (pictureElement.children[i].querySelector('img') === target) {
        // gallery.appendChild(renderGalleryItem(pictures[i]));
        // console.log(window.data.picData()[i + 1]);
        gallery.classList.remove('hidden');
        renderGalleryItem(pictures[i + 1]); // при клике получаю обьект, по которому кликнул пользователь, твоя задача - этот обьект передать в функцию, которая рендерит картинку с оверлеем
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
