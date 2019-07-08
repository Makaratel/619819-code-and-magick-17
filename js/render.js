'use strict';

(function () {
  var setupModal = document.querySelector('.setup');
  var setupSimilar = setupModal.querySelector('.setup-similar');
  var similarListElement = setupModal.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var generateWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var renderWizards = function (wizards) {
    var fragment = document.createDocumentFragment();
    var takeNumber = wizards.length > 4 ? 4 : wizards.length;
    similarListElement.innerHTML = '';

    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(generateWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);
    setupSimilar.classList.remove('hidden');
  };

  window.render = {
    renderWizards: renderWizards
  };
})();
