'use strict';

var WIZARD_FIRSTNAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var setupModal = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setupModal.querySelector('.setup-close');

var setupWizard = setupModal.querySelector('.setup-wizard');
var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireball = setupModal.querySelector('.setup-fireball-wrap');
var setupFireballInput = setupFireball.querySelector('input');

var similarListElement = setupModal.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var wizards = [];

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

var getRandomWizard = function () {
  for (var i = 0; i < 4; i++) {
    var wizardName = window.util.getRandomArrayElement(WIZARD_FIRSTNAMES) + ' ' + window.util.getRandomArrayElement(WIZARD_SURNAMES);
    var wizardCoatColor = window.util.getRandomArrayElement(COAT_COLORS);
    var wizardEyesColor = window.util.getRandomArrayElement(EYES_COLORS);

    var wizard = {
      name: wizardName,
      coatColor: wizardCoatColor,
      eyesColor: wizardEyesColor
    };
    wizards.push(wizard);
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

setupOpen.addEventListener('click', openSetup);
setupClose.addEventListener('click', closeSetup);

setupOpen.addEventListener('keydown', function (evt) {
  window.util.isEnterEvent(evt, openSetup);
});

setupClose.addEventListener('keydown', function (evt) {
  window.util.isEnterEvent(evt, closeSetup);
});

window.colorize(setupWizardCoat, COAT_COLORS);
window.colorize(setupWizardEyes, EYES_COLORS);
window.colorize(setupFireball, FIREBALL_COLORS, setupFireballInput);

getRandomWizard();
var fragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);
setupModal.querySelector('.setup-similar').classList.remove('hidden');
