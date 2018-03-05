'use strict';
(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var SUCCESS_STATUS = 200;
      var TIMEOUT = 10000;
      var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS_STATUS) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = TIMEOUT; // 10s
      xhr.open('GET', URL_LOAD);
      xhr.send();
    },
    upload: function (data, onLoad, onError) {
      var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.open('POST', URL_UPLOAD);
      xhr.send(data);
    },
    errorHandler: function (errorMessage) {
      var errorOverlay = document.querySelector('.error-overlay');
      errorOverlay.textContent = errorMessage;
      errorOverlay.style.display = 'block';
    }
  };
})();
