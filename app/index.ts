import express from 'express';

import format from './format-time';
import getData from './get-data';

const app: express.Application = express();
const startTime: number = Date.now();

interface Idata {
  events: Ievent[];
}

interface Ievent {
  type: string;
}

app.get('/', function (request: express.Request, response: express.Response): void {
  response.send('Hello Reviewer!');
});

app.get('/status', function (request: express.Request, response: express.Response): void {
  const currentTime: number = Date.now();
  const timeDelta: number = (currentTime - startTime) / 1000;
  const stringTime: string = format(timeDelta);
  response.send(stringTime);
});

app.get('/api/events', function (request: express.Request, response: express.Response): void {
  const inputData: Idata | boolean = getData('data/events.json');

  if (inputData === false) {
    response.status(500).send('The file does not exist! Please, provide data/events.json!');
    return;
  }

  const correctTypes: string[] = [];

  (inputData as Idata).events.forEach(function (item: Ievent): void {
    if (correctTypes.indexOf(item.type) === -1) {
      correctTypes.push(item.type);
    }
  });

  const type: string = request.param('type');

  if (type) {
    const typeArray: string[] = type.split(':');
    let isCorrect: boolean = false;

    for (const item of typeArray) {
      if (correctTypes.indexOf(item) !== -1) {
        isCorrect = true;
        break;
      }
    }

    if (isCorrect) {
      const filteredData: Ievent[] = (inputData as Idata).events.filter(function (item: Ievent): boolean {
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

app.get('*', function (request: express.Request, response: express.Response): void {
  response.status(404).send('<h1>Page not found!</h1>');
});

app.listen(8000, function (): void {
  console.log('Listening on port 8000!');
});
