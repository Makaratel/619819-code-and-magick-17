'use strict';

var WIZARD_FIRSTNAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupModal = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setupModal.querySelector('.setup-close');
var userNameInput = setupModal.querySelector('.setup-user-name');
var setupWizard = setupModal.querySelector('.setup-wizard');
var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireball = setupModal.querySelector('.setup-fireball-wrap');
var setupFireballInput = setupFireball.querySelector('input');

var similarListElement = setupModal.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var wizards = [];

var onSetupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeSetup();
  }
};

var openSetup = function () {
  setupModal.classList.remove('hidden');
  document.addEventListener('keydown', onSetupEscPress);
};

var closeSetup = function () {
  setupModal.classList.add('hidden');
  document.removeEventListener('keydown', onSetupEscPress);
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomWizard = function () {
  for (var i = 0; i < 4; i++) {
    var wizardName = WIZARD_FIRSTNAMES[getRandomNumber(0, WIZARD_FIRSTNAMES.length)] + ' ' + WIZARD_SURNAMES[getRandomNumber(0, WIZARD_SURNAMES.length)];
    var wizardCoatColor = COAT_COLORS[getRandomNumber(0, COAT_COLORS.length)];
    var wizardEyesColor = EYES_COLORS[getRandomNumber(0, EYES_COLORS.length)];

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
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetup();
  }
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetup();
  }
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя персонажа не должно быть короче 2 символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя персонажа не должно превышать 25 символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    userNameInput.setCustomValidity('Имя персонажа не должно быть короче 2 символов');
  } else {
    userNameInput.setCustomValidity('');
  }
});

setupWizardCoat.addEventListener('click', function () {
  var setupCoatColor = COAT_COLORS[getRandomNumber(0, COAT_COLORS.length)];
  setupWizardCoat.style.fill = setupCoatColor;
});

setupWizardEyes.addEventListener('click', function () {
  var setupEyesColor = EYES_COLORS[getRandomNumber(0, EYES_COLORS.length)];
  setupWizardEyes.style.fill = setupEyesColor;
});

setupFireball.addEventListener('click', function () {
  var setupFireballColor = FIREBALL_COLORS[getRandomNumber(0, FIREBALL_COLORS.length)];
  setupFireball.style.backgroundColor = setupFireballColor;
  setupFireballInput.value = setupFireballColor;
});

getRandomWizard();
var fragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);
setupModal.querySelector('.setup-similar').classList.remove('hidden');
