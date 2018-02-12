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
  checkboxContainer.addEventListener('click', function (event) {
    if (event.target.name === 'effect') {
      var str = event.target.id;
      str = str.substr(7);
      resizeImage.classList.remove(resizeImage.classList[1]);
      resizeImage.classList.add(str);
    }
  }, true);
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
