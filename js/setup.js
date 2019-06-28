'use strict';

var WIZARD_FIRSTNAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var setupModal = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setupModal.querySelector('.setup-close');
var setupForm = setupModal.querySelector('.setup-wizard-form');
var setupSimilar = setupModal.querySelector('.setup-similar');

var setupWizard = setupModal.querySelector('.setup-wizard');
var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireball = setupModal.querySelector('.setup-fireball-wrap');
var setupFireballInput = setupFireball.querySelector('input');

var similarListElement = setupModal.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

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

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
  return wizardElement;
};

var insertWizards = function (wizards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < 4; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);
  setupSimilar.classList.remove('hidden');
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

window.backend.load(insertWizards);

setupForm.addEventListener('submit', function (evt) {
  window.backend.save(new FormData(setupForm), function (response) {
    setupModal.classList.add('hidden');
  });
  evt.preventDefault();
});
