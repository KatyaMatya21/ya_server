const express = require('express');
const format = require('./format-time.js');
const getData = require('./get-data.js');

const app = express();
const startTime = Date.now();

app.get('/', function (request, response) {
  response.send('Hello Reviewer!');
});

app.get('/status', function (request, response) {
  const currentTime = Date.now();
  const timeDelta = (currentTime - startTime) / 1000;
  const stringTime = format.formatTime(timeDelta);
  response.send(stringTime);
});

app.get('/api/events', function (request, response) {
  const inputData = getData.getData('data/events.json');
  let correctTypes = [];

  inputData.events.forEach(function (item) {
    if (correctTypes.indexOf(item.type) === -1) {
      correctTypes.push(item.type);
    }
  });

  const type = request.param('type');

  if (type) {
    const typeArray = type.split(':');
    let isCorrect = false;

    for (let item of typeArray) {
      if (correctTypes.indexOf(item) !== -1) {
        isCorrect = true;
        break;
      }
    }

    if (isCorrect) {
      const filteredData = inputData.events.filter(function (item) {
        return typeArray.indexOf(item.type) !== -1;
      });
      response.send(filteredData);
    } else {
      response.status(400).send('Its not a correct type!');
    }
  } else {
    response.send(inputData);
  }
});

app.get('*', function (request, response) {
  response.status(404).send('<h1>Page not found!</h1>');
});

app.listen(8000, function () {
  console.log('Listening on port 8000!');
});
