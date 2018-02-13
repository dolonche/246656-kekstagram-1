'use strict';
(function () {
  var formSelect = document.querySelector('#upload-select-image');
  var uploadFile = formSelect.querySelector('#upload-file');
  var uploadFileWrapper = formSelect.querySelector('.upload-image');
  var formFrame = formSelect.querySelector('.upload-overlay');
  var formFrameCancel = formSelect.querySelector('.upload-form-cancel');
  var formDescr = formSelect.querySelector('.upload-form-description');
  var resizeImage = formSelect.querySelector('.effect-image-preview');
  var resizeControl = formSelect.querySelector('.upload-resize-controls');
  var resizeValue = formSelect.querySelector('.upload-resize-controls-value');
  var checkboxContainer = formSelect.querySelector('.upload-effect-controls');
  var hashtag = formSelect.querySelector('.upload-form-hashtags');
  var effectContainer = formSelect.querySelector('.upload-effect-level');
  var effectPin = formSelect.querySelector('.upload-effect-level-pin');
  var effectLevel = formSelect.querySelector('.upload-effect-level-val');
  var filterValue = function (shift) {
    switch (resizeImage.classList[1]) {
      case 'effect-chrome':
        resizeImage.style.filter = 'grayscale(' + ((shift) / 456) + ')';
        break;
      case 'effect-sepia':
        resizeImage.style.filter = 'sepia(' + ((shift) / 456) + ')';
        break;
      case 'effect-marvin':
        resizeImage.style.filter = 'invert(' + ((shift) / 4.56) + '%)';
        break;
      case 'effect-phobos':
        resizeImage.style.filter = 'blur(' + ((shift) / 152) + 'px)';
        break;
      case 'effect-heat':
        resizeImage.style.filter = 'brightness(' + ((shift) / 152) + ')';
        break;
    }
  };
  var closeFormFrame = function () {
    formFrame.classList.add('hidden');
    uploadFileWrapper.classList.remove('hidden');
  };
  uploadFile.addEventListener('change', function () {
    uploadFileWrapper.classList.add('hidden');
    formFrame.classList.remove('hidden');
  });
  formFrameCancel.addEventListener('click', closeFormFrame);
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      if (formDescr === document.activeElement) {
        formFrame.classList.remove('hidden');
      } else {
        closeFormFrame();
      }
    }
  });
  var resizeImageValue = function () {
    resizeImage.style.transform = 'scale' + '(0.' + parseInt(resizeValue.value, 10) + ')';
  };
  resizeControl.addEventListener('click', function (event) {
    if (event.target.classList[event.target.classList.length - 1] === 'upload-resize-controls-button-dec') {
      if (parseInt(resizeValue.value, 10) > parseInt(25, 10)) {
        resizeValue.value = parseInt(resizeValue.value, 10) - parseInt(25, 10) + '%';
        resizeImageValue();
      }
    } else if (event.target.classList[event.target.classList.length - 1] === 'upload-resize-controls-button-inc') {
      if (parseInt(resizeValue.value, 10) < parseInt(100, 10)) {
        resizeValue.value = parseInt(resizeValue.value, 10) + parseInt(25, 10) + '%';
        resizeImageValue();
        if (parseInt(resizeValue.value, 10) === parseInt(100, 10)) {
          resizeImage.style.transform = 'scale(1)';
        }
      }
    }
  }, true);
  effectContainer.style.display = 'none';
  checkboxContainer.addEventListener('click', function (event) {
    if (event.target.name === 'effect') {
      effectPin.style.left = '20%';
      effectLevel.style.width = '20%';
      var str = event.target.id;
      str = str.substr(7);
      resizeImage.classList.remove(resizeImage.classList[1]);
      resizeImage.classList.add(str);
      filterValue(91.2);
    }
    if (event.target.value === 'none') {
      effectContainer.style.display = 'none';
    } else {
      effectContainer.style.display = 'block';
    }
  }, true);
  effectPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var x = evt.clientX;
    var onMouseMove = function (moveEvt) {
      if (effectPin.offsetLeft <= 456 && effectPin.offsetLeft >= 0) {
        moveEvt.preventDefault();
        var shiftX = x - moveEvt.clientX;
        x = moveEvt.clientX;
        effectPin.style.left = (effectPin.offsetLeft - shiftX) + 'px';
        effectLevel.style.width = (effectPin.offsetLeft - shiftX) + 'px';
        if (effectPin.offsetLeft - shiftX >= 456) {
          effectPin.style.left = 455 + 'px';
        }
        if (effectPin.offsetLeft - shiftX <= 0) {
          effectPin.style.left = 1 + 'px';
        }
        filterValue(effectPin.offsetLeft - shiftX);
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  formDescr.addEventListener('submit', function () {
    if (!formDescr.validity.valid) {
      formDescr.style.borderColor = 'red';
    }
    if (!hashtag.validity.valid) {
      hashtag.style.borderColor = 'red';
    }
    formSelect.reset();
  });
})();
