'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var COLOR_TEXT = 'rgba(0, 0, 0, 1)';
var CLOUD_X = 100;
var CLOUD_Y = 10;
var OFFSET = 15;
var OFFSET_FONT = 20;
var OFFSET_BAR = 50;
var BAR_WIDTH = 40;
var barHeight = CLOUD_HEIGHT - (CLOUD_Y + OFFSET + OFFSET_FONT * 2) - OFFSET - OFFSET_FONT - OFFSET_FONT - OFFSET_FONT / 2;

var renderCloud = function (ctx, x, y ,color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
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

var getRandomBarColor = function () {
  var randomProcent = Math.random().toFixed(2) * 100;
  var randomColor = 'hsl(240, ' + randomProcent + '%, 25%)';
  return randomColor;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + OFFSET, CLOUD_Y + OFFSET, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgba(255, 255, 255, 1)');

  var maxTime = getMaxElement(times);

  ctx.Font = '16px PT Mono';
  ctx.fillStyle = COLOR_TEXT;
  ctx.fillText('Ура вы победили', CLOUD_X + OFFSET, CLOUD_Y + OFFSET + OFFSET_FONT);
  ctx.fillText('Список результатов:', CLOUD_X + OFFSET, CLOUD_Y + OFFSET + OFFSET_FONT * 2);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = COLOR_TEXT;
    ctx.fillText(Math.round(times[i]), CLOUD_X + OFFSET_BAR + (BAR_WIDTH + OFFSET_BAR) * i, (CLOUD_HEIGHT - OFFSET_FONT / 2) - (barHeight * times[i] / maxTime) - OFFSET - OFFSET_FONT / 2);
    ctx.fillText(names[i], CLOUD_X + OFFSET_BAR + (BAR_WIDTH + OFFSET_BAR) * i, CLOUD_HEIGHT - OFFSET_FONT / 2);
    ctx.fillStyle = getRandomBarColor();

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }

    ctx.fillRect(CLOUD_X + OFFSET_BAR + (BAR_WIDTH + OFFSET_BAR) * i, (CLOUD_HEIGHT - OFFSET_FONT / 2 - OFFSET_FONT) + (1 - barHeight * times[i] / maxTime), BAR_WIDTH, barHeight * times[i] / maxTime);
  }
};
