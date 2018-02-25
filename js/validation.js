'use strict';
(function () {
  // Объявляем переменные
  var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
  var uploadFormDescription = document.querySelector('.upload-form-description');
  var formSelect = document.querySelector('#upload-select-image');
  var uploadForm = document.querySelector('.upload-form');
  var formFrame = formSelect.querySelector('.upload-overlay');
  var MAX_LENGTH_OF_HASHTAG = 20;
  var MAX_COUNT_HASHTAG = 5;

  // Функцмя для вылидации поля с хэштегами
  function onInputTagInvalid(e) {
    // Создаем массив из сттрок поля на котором происходит действие
    var hashtags = e.target.value.toLowerCase().split(' ');
    // создаем пустой объект для проверки массива на одинаковые значения
    var obj = {};

    for (var i = 0; i < hashtags.length; i++) {
      var hashtag = hashtags[i];
      // проверка на наличие хэштега первым символом
      if (hashtag.indexOf('#', 0) !== 0) {
        e.target.setCustomValidity('Хэш-тег должен начинаться с символа #');
        setErrorRedLine(e);
        return;
      }
      // проверка на количество символов в хэштеге
      if (hashtag.length > MAX_LENGTH_OF_HASHTAG) {
        e.target.setCustomValidity('Максимальная длина одного хэш-тега 20 символов');
        setErrorRedLine(e);
        return;
      }
      // проверка на наличие пробелов между хэштегами
      // если индекс хэштега не 0, т.е он не первый, то оштбка
      if (hashtag.lastIndexOf('#') !== 0) {
        e.target.setCustomValidity('хэш-теги должны разделятся пробелами');
        setErrorRedLine(e);
        return;
      }
      // если i элемент находиться в объекте, то
      if (hashtag in obj) {
        e.target.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды;');
        setErrorRedLine(e);
        return;
      }

      // проверка на количество элементов в массиве хэштегов
      if (hashtags.length > MAX_COUNT_HASHTAG) {
        e.target.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
        setErrorRedLine(e);
        return;
      }

      obj[hashtag] = true; // запомнить масив в виде свойства объекта для проверки на повторение
      // сбрасываем
      e.target.setCustomValidity('');
      e.target.style.border = '';
    }
  }

  //  функция для отрисовки красной линии при ошибке
  function setErrorRedLine(e) {
    e.target.style.border = '2px solid red';
  }
  // навешиваем обработчики событий
  uploadFormHashtags.addEventListener('input', onInputTagInvalid);
  // Форма сброса полей ввода информации у фото
  function formReset() {
    uploadFormHashtags.value = '';
    uploadFormDescription.value = '';
    formFrame.classList.add('hidden');
  }
  // Обработчик событий на отправку формы
  uploadForm.addEventListener('submit', function (e) {
    e.preventDefault();
    window.backend.upload(new FormData(uploadForm), formReset, window.backend.errorHandler);
  });
})();
