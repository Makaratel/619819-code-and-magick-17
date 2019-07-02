'use strict';

(function () {
  var getRank = function (wizard, coatColor, eyesColor) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }

    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var nameComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function (wizards, coatColor, eyesColor) {
    window.render.renderWizards(wizards.slice().sort(function (left, right) {
      var rankDifference = getRank(right, coatColor, eyesColor) - getRank(left, coatColor, eyesColor);

      if (rankDifference === 0) {
        rankDifference = nameComparator(left.name, right.name);
      }

      return rankDifference;
    }));
  };

  window.similar = {
    updateWizards: updateWizards
  }
})();
