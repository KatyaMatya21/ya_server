const fs = require('fs');

/**
 * Gets data from file
 * @param url {string}
 * @returns {string}
 */
const getData = function (url) {
  if (!fs.existsSync(url)) {
    response.status(500).send('The file does not exist! Please, provide data/events.json!');
    return;
  }

  return JSON.parse(fs.readFileSync(url, 'utf8'));
};

module.exports.getData = getData;
