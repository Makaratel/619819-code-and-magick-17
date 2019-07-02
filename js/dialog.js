'use strict';

(function () {
  var setupModal = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupModal.querySelector('.setup-close');
  var setupDialogElement = document.querySelector('.setup');
  var dialogHandler = setupDialogElement.querySelector('.upload');
  var artifactsShop = setupDialogElement.querySelector('.setup-artifacts-shop');
  var star = artifactsShop.querySelector('img');

  var onSetupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeSetup);
  };

  var openSetup = function () {
    setupModal.classList.remove('hidden');
    document.addEventListener('keydown', onSetupEscPress);
  };

  var closeSetup = function () {
    setupModal.classList.add('hidden');
    document.removeEventListener('keydown', onSetupEscPress);
  };

  setupOpen.addEventListener('click', openSetup);
  setupClose.addEventListener('click', closeSetup);

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openSetup);
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closeSetup);
  });

  window.util.getDraggableElement(setupDialogElement, dialogHandler);
  window.util.getDraggableElement(star, star);
})();
