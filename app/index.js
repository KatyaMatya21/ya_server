const express = require('express');
const format = require('./format-time.js');
const fs = require('fs');

const app = express();
const startTime = Date.now();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.all('/status', function (req, res, next) {
  const currentTime = Date.now();
  const timeDelta = (currentTime - startTime) / 1000;
  const stringTime = format.formatTime(timeDelta);

  res.send(stringTime);
  next();
});

app.all('/api/events', function (req, res, next) {

  if (!fs.existsSync('data/events.json')) {
    console.log('The file does not exist! Please, provide data/events.json!');
    return;
  }

  const inputData = JSON.parse(fs.readFileSync('data/events.json', 'utf8'));

  res.send(inputData);
  next();
});

app.listen(8000, function () {
  console.log('Listening on port 8000!');
});
