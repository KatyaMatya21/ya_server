/**
 * Formats time to string
 * @param {int} time
 * @returns {string}
 */
const formatTime = function (time) {
  let hours = time / 1000 / 60 / 60;
  hours = hours - (hours % 1);
  let left = time - hours * 1000 * 60 * 60;
  let minutes = left / 60;
  minutes = minutes - (minutes % 1);
  let seconds = Math.floor(time - hours * 3600 - minutes * 60);

  if (hours < 10) {
    hours = '0' + hours;
  }

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  return hours + ':' + minutes + ':' + seconds;
};

module.exports.formatTime = formatTime;
