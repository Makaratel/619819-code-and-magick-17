'use strict';

(function () {
  window.colorize = function (element, colorsArray, formElement) {
    element.addEventListener('click', function () {
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = window.util.getRandomArrayElement(colorsArray);
        formElement.value = window.util.getRandomArrayElement(colorsArray);
      } else {
        element.style.fill = window.util.getRandomArrayElement(colorsArray);
      }
    });
  };
})();
