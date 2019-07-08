'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomArrayElement = function (array) {
    return array[getRandomNumber(0, array.length)];
  };

  var getMaxElement = function (array) {
    var maxElement = array[0];

    for (var i = 0; i < array.length; i++) {
      if (array[i] > maxElement) {
        maxElement = array[i];
      }
    }
    return maxElement;
  };

  var getDraggableElement = function (draggableElement, initialElement) {
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

  var debounce = function(func, DEBOUNCE_INTERVAL, immediate) {
    var timeout;

    return function() {
      var context = this, args = arguments;

      var onComplete = function() {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };

      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(onComplete, DEBOUNCE_INTERVAL);
      if (callNow) {
        func.apply(context, args);
      }
    };
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getRandomNumber: getRandomNumber,
    getRandomArrayElement: getRandomArrayElement,
    getMaxElement: getMaxElement,
    getDraggableElement: getDraggableElement,
    debounce: debounce
  };
})();
