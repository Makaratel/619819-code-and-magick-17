'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setupModal = document.querySelector('.setup');
  var setupWizard = setupModal.querySelector('.setup-wizard-appearance');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var fireball = setupModal.querySelector('.setup-fireball-wrap');
  var fireballInput = fireball.querySelector('input');
  var coatColor;
  var eyesColor;
  var wizards = [];

  var successHandler = function (data) {
    wizards = data;
    window.render.renderWizards(wizards);
  };

  var colorize = function (element, colorsArray, elementColor, formElement) {
    element.addEventListener('click', function () {
      var newColor = window.util.getRandomArrayElement(colorsArray);

      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = newColor;
        formElement.value = newColor;
      } else {
        element.style.fill = newColor;
      }

      if (newColor.match(/rgb/)) {
        coatColor = newColor;
      } else {
        eyesColor = newColor;
      }

      window.similar.updateWizards(wizards, coatColor, eyesColor);
    });
  };

  window.backend.load(successHandler);
  colorize(wizardCoat, COAT_COLORS, coatColor);
  colorize(wizardEyes, EYES_COLORS, eyesColor);
  colorize(fireball, FIREBALL_COLORS, null, fireballInput);
})();
