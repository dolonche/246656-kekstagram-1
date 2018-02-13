'use strict';
(function () {
  var MIN_LIKES = 1;
  var MAX_LIKES = 200;
  var photoComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !'];
  var randomComments = function (commentsArr) {
    var commentsValue = Math.floor(Math.random() * (commentsArr.length));
    return commentsValue;
  };
  var randomLikes = function (minLikes, maxLikes) {
    var likesValue = Math.floor(Math.random() * (maxLikes - minLikes)) + minLikes;
    return likesValue;
  };
  window.data = {
    picturesTemplate: document.querySelector('#picture-template').content,
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    picData: function () {
      var pictures = [];
      for (var i = 0; i <= 25; i++) {
        var photo = {
          url: 'photos/' + i + '.jpg',
          likes: randomLikes(MIN_LIKES, MAX_LIKES),
          comments: randomComments(photoComments),
        };
        pictures.push(photo);
      }
      return pictures;
    },
  };
})();
