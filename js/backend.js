'use strict';
(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var URLLoad = 'https://js.dump.academy/kekstagram/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        var successLoadData = onLoad(xhr.response);
        var errorLoadData = onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        return (xhr.status === 200) ? successLoadData : errorLoadData;
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = 10000; // 10s
      xhr.open('GET', URLLoad);
      xhr.send();
    },
    upload: function (data, onLoad, onError) {
      var URLUpload = 'https://js.dump.academy/kekstagram';
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
      xhr.open('POST', URLUpload);
      xhr.send(data);
    },
    errorHandler: function (errorMessage) {
      var errorOverlay = document.querySelector('.error-overlay');
      errorOverlay.textContent = errorMessage;
      errorOverlay.style.display = 'block';
    }
  };
})();
