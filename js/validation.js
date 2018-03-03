'use strict';
(function () {
  // Объявляем переменные
  var MAX_LENGTH_OF_HASHTAG = 20;
  var MAX_COUNT_HASHTAG = 5;
  var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
  var uploadFormDescription = document.querySelector('.upload-form-description');
  var formSelect = document.querySelector('#upload-select-image');
  var uploadForm = document.querySelector('.upload-form');
  var formFrame = formSelect.querySelector('.upload-overlay');
  // Функцмя для вылидации поля с хэштегами
  var onInputTagInvalid = function (evt) {
    // Создаем массив из сттрок поля на котором происходит действие
    var hashtags = evt.target.value.toLowerCase().split(' ');
    // создаем пустой объект для проверки массива на одинаковые значения
    var obj = {};

    for (var i = 0; i < hashtags.length; i++) {
      var hashtag = hashtags[i];
      // проверка на наличие хэштега первым символом
      if (hashtag.indexOf('#', 0) !== 0) {
        evt.target.setCustomValidity('Хэш-тег должен начинаться с символа #');
        setErrorRedLine(evt);
        return;
      }
      // проверка на количество символов в хэштеге
      if (hashtag.length > MAX_LENGTH_OF_HASHTAG) {
        evt.target.setCustomValidity('Максимальная длина одного хэш-тега 20 символов');
        setErrorRedLine(evt);
        return;
      }
      // проверка на наличие пробелов между хэштегами
      // если индекс хэштега не 0, т.е он не первый, то оштбка
      if (hashtag.lastIndexOf('#') !== 0) {
        evt.target.setCustomValidity('хэш-теги должны разделятся пробелами');
        setErrorRedLine(evt);
        return;
      }
      // если i элемент находиться в объекте, то
      if (hashtag in obj) {
        evt.target.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды;');
        setErrorRedLine(evt);
        return;
      }

      // проверка на количество элементов в массиве хэштегов
      if (hashtags.length > MAX_COUNT_HASHTAG) {
        evt.target.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
        setErrorRedLine(evt);
        return;
      }

      obj[hashtag] = true; // запомнить масив в виде свойства объекта для проверки на повторение
      // сбрасываем
      evt.target.setCustomValidity('');
      evt.target.style.border = '';
    }
  };
  //  функция для отрисовки красной линии при ошибке
  var setErrorRedLine = function (evt) {
    evt.target.style.border = '2px solid red';
  };
  // навешиваем обработчики событий
  uploadFormHashtags.addEventListener('input', onInputTagInvalid);
  // Форма сброса полей ввода информации у фото
  var formReset = function () {
    uploadFormHashtags.value = '';
    uploadFormDescription.value = '';
    formFrame.classList.add('hidden');
  };
  // Обработчик событий на отправку формы
  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(uploadForm), formReset, window.backend.errorHandler);
  });
})();
