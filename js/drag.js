'use strict';

(function () {
  window.getDraggableElement = function (draggableElement, initialElement) {
    initialElement.addEventListener('mousedown', function (downEvt) {
      downEvt.preventDefault();
      draggableElement.style.position = 'absolute';
      draggableElement.style.zIndex = '2';

      var dragged = false;
      var startCoords = {
        x: downEvt.clientX,
        y: downEvt.clientY
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
          var onClickPreventDefault = function (evt) {
            evt.preventDefault();
            initialElement.removeEventListener('click', onClickPreventDefault);
          };

          initialElement.addEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };
})();
