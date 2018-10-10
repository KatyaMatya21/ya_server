const express = require('express');
const format = require('./format-time.js');

const app = express();

const startTime = Date.now();
let currentTime = null;

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.all('/status', function (req, res, next) {
  currentTime = Date.now();
  const timeDelta = (currentTime - startTime) / 1000;
  const stringTime = format.formatTime(timeDelta);

  res.send(stringTime);
  next();
});

app.listen(8000, function () {
  console.log('Listening on port 8000!');
});
