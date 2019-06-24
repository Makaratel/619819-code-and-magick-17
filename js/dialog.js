'use strict';

(function () {
  var setupDialogElement = document.querySelector('.setup');
  var dialogHandler = setupDialogElement.querySelector('.upload');
  var artifactsShop = setupDialogElement.querySelector('.setup-artifacts-shop');
  var star = artifactsShop.querySelector('img');

  window.util.getDraggableElement(setupDialogElement, dialogHandler);
  window.util.getDraggableElement(star, star);
})();
