'use strict';
(function () {
  var formSelect = document.querySelector('#upload-select-image');
  var uploadFile = formSelect.querySelector('#upload-file');
  var formFrame = formSelect.querySelector('.upload-overlay');
  var formFrameCancel = formSelect.querySelector('.upload-form-cancel');
  var formDescr = formSelect.querySelector('.upload-form-description');
  var resizeImage = formSelect.querySelector('.effect-image-preview');
  var resizeControl = formSelect.querySelector('.upload-resize-controls');
  var resizeValue = formSelect.querySelector('.upload-resize-controls-value');
  var resizeScaleStep = parseInt(25, 10);
  var checkboxContainer = formSelect.querySelector('.upload-effect-controls');
  var effectContainer = formSelect.querySelector('.upload-effect-level');
  var effectPin = formSelect.querySelector('.upload-effect-level-pin');
  var effectLevel = formSelect.querySelector('.upload-effect-level-val');
  var decButton = formSelect.querySelector('.upload-resize-controls-button-dec');
  var incButton = formSelect.querySelector('.upload-resize-controls-button-inc');
  var pinBasePos = '20%';
  var pinMinPos = 1;
  var pinMaxPos = 456;
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
  };
  uploadFile.addEventListener('change', function () {
    formFrame.classList.remove('hidden');
  });
  formFrameCancel.addEventListener('click', closeFormFrame);
  document.addEventListener('keydown', function (e) {
    if (e.keyCode === window.data.ESC_KEYCODE) {
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
  resizeControl.addEventListener('click', function (e) {
    if (e.target === decButton) {
      if (parseInt(resizeValue.value, 10) > resizeScaleStep) {
        resizeValue.value = parseInt(resizeValue.value, 10) - resizeScaleStep + '%';
        resizeImageValue();
      }
    } else if (e.target === incButton) {
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
  checkboxContainer.addEventListener('click', function (e) {
    var str = e.target.id;
    if (e.target.name === 'effect') {
      str = str.substr(7);
      effectPin.style.left = pinBasePos;
      effectLevel.style.width = pinBasePos;
      resizeImage.classList.remove(resizeImage.classList[1]);
      resizeImage.classList.add(str);
      filterValue(91.2);
    }
    if (e.target.value === 'none') {
      effectContainer.style.display = 'none';
    } else {
      effectContainer.style.display = 'block';
    }
  }, true);
  effectPin.addEventListener('mousedown', function (e) {
    e.preventDefault();
    var x = e.clientX;
    var onMouseMove = function (movee) {
      var shiftX = x - movee.clientX;
      var effectPinSetLeft = effectPin.offsetLeft;
      if (effectPinSetLeft <= pinMaxPos && effectPinSetLeft >= 0) {
        movee.preventDefault();
        x = movee.clientX;
        effectPin.style.left = (effectPinSetLeft - shiftX) + 'px';
        effectLevel.style.width = (effectPinSetLeft - shiftX) + 'px';
        if (effectPinSetLeft - shiftX >= pinMaxPos) {
          effectPin.style.left = pinMaxPos - 1 + 'px';
        }
        if (effectPinSetLeft - shiftX <= 0) {
          effectPin.style.left = pinMinPos + 'px';
        }
        filterValue(effectPinSetLeft - shiftX);
      }
    };
    var onMouseUp = function (upe) {
      upe.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
