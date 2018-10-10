# Node js

[Входные данные](./data/events.json)

## Запуск

- Выполнить `npm i`. 
- В файле `data/events.json` ввести входные данные.
- Выполнить `npm start`.
- Посмотреть на `8000` порт в браузере.
- `/status` время, прошедшее с запуска сервера.
- `/api/events` содержимое файла `events.json`.
- `/api/events?type=info` содержимое файла `events.json` c фильтрацией по типу событий.
- `/api/events?type=critical` содержимое файла `events.json` c фильтрацией по типу событий.
- `/api/events?type=info:critical` некоректный ввод типа.
- `/helpme` 404.
