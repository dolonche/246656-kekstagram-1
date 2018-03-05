'use strict';
(function () {
  var PIN_BASE_POS = '100%';
  var PIN_MIN_POS = 1;
  var PIN_MAX_POS = 456;
  var FILTER_NUMBER_VALUE = 456;
  var formSelect = document.querySelector('#upload-select-image');
  var uploadFile = formSelect.querySelector('#upload-file');
  var formFrame = formSelect.querySelector('.upload-overlay');
  var formFrameCancel = formSelect.querySelector('.upload-form-cancel');
  var formDescr = formSelect.querySelector('.upload-form-description');
  var resizeImage = formSelect.querySelector('.effect-image-preview');
  var resizeImageClass = resizeImage.classList[1];
  var resizeControl = formSelect.querySelector('.upload-resize-controls');
  var resizeValue = formSelect.querySelector('.upload-resize-controls-value');
  var resizeScaleStep = parseInt(25, 10);
  var checkboxContainer = formSelect.querySelector('.upload-effect-controls');
  var effectContainer = formSelect.querySelector('.upload-effect-level');
  var effectPin = formSelect.querySelector('.upload-effect-level-pin');
  var effectLevel = formSelect.querySelector('.upload-effect-level-val');
  var decButton = formSelect.querySelector('.upload-resize-controls-button-dec');
  var incButton = formSelect.querySelector('.upload-resize-controls-button-inc');
  var filterValue = function (shift) {
    switch (resizeImageClass) {
      case 'effect-none':
        resizeImage.style.filter = '';
        break;
      case 'effect-chrome':
        resizeImage.style.filter = 'grayscale(' + ((shift) / FILTER_NUMBER_VALUE) + ')';
        break;
      case 'effect-sepia':
        resizeImage.style.filter = 'sepia(' + ((shift) / FILTER_NUMBER_VALUE) + ')';
        break;
      case 'effect-marvin':
        resizeImage.style.filter = 'invert(' + ((shift) / 4.56) + '%)';
        break;
      case 'effect-phobos':
        resizeImage.style.filter = 'blur(' + ((shift) / (FILTER_NUMBER_VALUE / 3)) + 'px)';
        break;
      case 'effect-heat':
        resizeImage.style.filter = 'brightness(' + ((shift) / (FILTER_NUMBER_VALUE / 3)) + ')';
        break;
    }
  };
  var closeFormFrame = function () {
    formFrame.classList.add('hidden');
  };
  uploadFile.addEventListener('change', function () {
    formFrame.classList.remove('hidden');
  });
  formFrameCancel.addEventListener('click', closeFormFrame);
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      closeFormFrame();
    }
  });
  var resizeImageValue = function () {
    resizeImage.style.transform = 'scale' + '(0.' + parseInt(resizeValue.value, 10) + ')';
  };
  resizeControl.addEventListener('click', function (evt) {
    if (evt.target === decButton) {
      if (parseInt(resizeValue.value, 10) > resizeScaleStep) {
        resizeValue.value = parseInt(resizeValue.value, 10) - resizeScaleStep + '%';
        resizeImageValue();
      }
    } else if (evt.target === incButton) {
      if (parseInt(resizeValue.value, 10) < parseInt(100, 10)) {
        resizeValue.value = parseInt(resizeValue.value, 10) + resizeScaleStep + '%';
        resizeImageValue();
        if (parseInt(resizeValue.value, 10) === parseInt(100, 10)) {
          resizeImage.style.transform = 'scale(1)';
        }
      }
    }
  }, true);
  effectContainer.style.display = 'none';
  checkboxContainer.addEventListener('click', function (evt) {
    var str = evt.target.id;
    if (evt.target.name === 'effect') {
      str = str.substr(7);
      effectPin.style.left = PIN_BASE_POS;
      effectLevel.style.width = PIN_BASE_POS;
      resizeImage.classList.remove(resizeImage.classList[1]);
      resizeImage.classList.add(str);
      filterValue(456);
    }
    effectContainer.style.display = (evt.target.value === 'none') ? 'none' : 'block';
  }, true);
  effectPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var x = evt.clientX;
    var onMouseMove = function (movee) {
      var shiftX = x - movee.clientX;
      var effectPinSetLeft = effectPin.offsetLeft;
      if (effectPinSetLeft <= PIN_MAX_POS && effectPinSetLeft >= 0) {
        movee.preventDefault();
        x = movee.clientX;
        effectPin.style.left = (effectPinSetLeft - shiftX) + 'px';
        effectLevel.style.width = (effectPinSetLeft - shiftX) + 'px';
        if (effectPinSetLeft - shiftX >= PIN_MAX_POS) {
          effectPin.style.left = PIN_MAX_POS - 1 + 'px';
        }
        if (effectPinSetLeft - shiftX <= 0) {
          effectPin.style.left = PIN_MIN_POS + 'px';
        }
        filterValue(effectPinSetLeft - shiftX);
      }
    };
    var onMouseUp = function (upevt) {
      upevt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
