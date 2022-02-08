# Лавка эликсиров Армасона

Данный проект представляет собой фронтенд приложение, реализующее виртуальную лавку для продажи ведьмачьих эликсиров.

## Preview
![elixirs-page_1](https://i.imgur.com/kqHXEAD.jpg)
![elixirs-page_2](https://i.imgur.com/Q2Xez1L.jpg)
![elixirs-page_3](https://i.imgur.com/fB3iF7b.jpg)

## Tech stack
`HTML`
`CSS`
`TypeScript`
`React`
`React-Redux`
`JSON-server`

## Протестировать само приложение можно по ссылке
https://armason-elixirs.herokuapp.com/

## Поддерживаемые платформы
Приложение протестировано для работы с мобильными устройствами и десктопами.

## Инструкция по установке
npm run json-server - поднять локальный сервер для работы с базой данных <br>
npm start - перейти в режим разработки <br>
npm build - собрать проект в production режиме <br>

## Внимание!
В режиме разработки необходимо поменять URL axios запроса внутри файла `redux/actions/elixirs.ts` на следующий: <br>
`http://localhost:3001/elixirs`
