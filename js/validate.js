'use strict';

(function () {
  var setupModal = document.querySelector('.setup');
  var setupForm = setupModal.querySelector('.setup-wizard-form');
  var userNameInput = setupModal.querySelector('.setup-user-name');

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя персонажа не должно быть короче 2 символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя персонажа не должно превышать 25 символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  userNameInput.addEventListener('input', function () {
    if (userNameInput.value.length < 2) {
      userNameInput.setCustomValidity('Имя персонажа не должно быть короче 2 символов');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  setupForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(setupForm), function () {
      setupModal.classList.add('hidden');
    });
    evt.preventDefault();
  });
})();
