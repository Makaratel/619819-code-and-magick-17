'use strict';

(function () {
  var setupDialogElement = document.querySelector('.setup');
  var dialogHandler = setupDialogElement.querySelector('.upload');
  var artifactsShop = setupDialogElement.querySelector('.setup-artifacts-shop');
  var star = artifactsShop.querySelector('img');

  var getDraggableElement = function (draggableElement, initialElemnt) {
    initialElemnt.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      draggableElement.style.position = 'absolute';
      draggableElement.style.zIndex = '2';

      var dragged = false;
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        dragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        draggableElement.style.top = (draggableElement.offsetTop - shift.y) + 'px';
        draggableElement.style.left = (draggableElement.offsetLeft - shift.x) + 'px';
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragged) {
          var onClickPreventDefault = function () {
            evt.preventDefault();
            initialElemnt.removeEventListener('click', onClickPreventDefault);
          };

          initialElemnt.addEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  getDraggableElement(setupDialogElement, dialogHandler);
  getDraggableElement(star, star);
})();
