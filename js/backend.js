'use strict';
(function () {
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';

  var setup = function (onLoad, onError) {
    var SUCCESS_STATUS = 200;
    var SERVER_TIME = 10000;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad(xhr.response);
      } else {
        onError(xhr.response);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = SERVER_TIME; // 10s

    return xhr;
  }

  var load = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('GET', URL_UPLOAD + '/data');
    xhr.send();
  }

  var upload = function (data, onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  }

  var errorHandler = function (errorMessage) {
    var errorOverlay = document.querySelector('.error-overlay');
    errorOverlay.textContent = errorMessage;
    errorOverlay.style.display = 'block';
  }

  window.backend  = {
    load: load,
    upload: upload,
    errorHandler: errorHandler
  };
})();
