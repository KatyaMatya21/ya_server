/**
 * Formats time to string
 * @param {number} time
 * @returns {string}
 */
export default function formatTime(time: number): string {
  let hours: number | string = time / 1000 / 60 / 60;
  hours = hours - (hours % 1);
  const left: number = time - hours * 1000 * 60 * 60;
  let minutes: number | string = left / 60;
  minutes = minutes - (minutes % 1);
  let seconds: number | string = Math.floor(time - hours * 3600 - minutes * 60);

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
}
