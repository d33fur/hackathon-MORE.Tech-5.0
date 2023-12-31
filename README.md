# MORE.Tech 5.0

## Функционал 
Сервис помогает пользователю найти ближайшее отделение ВТБ с учетом его загруженности.
Для этого определяется местоположение пользователя, время пути до ближайших отделений, время ожидания в них.
Время ожидания рассчитывается на каждый час каждого дня недели на основе статистики а также исходя из текущей очереди в отделение.

Реализована функция поиска услуг по описанию с помощью BERT модели с дообученными слоями.
В поисковой строке пользователь может ввести неточное назване услуги и нейросеть предложит похожие по ее мнению. Например: по запросу "сейф" пользователь увидит услуги: "Аренда сейфовых ячеек",  "Надежное хранение документов и ценностей", "Налогия", "Финансовый резерв", "Справка о наличии счетов". Также с помощью поисковой строки можно искать адрес отделения (не реализовано из-за слложности отличить запрос от адреса)

На сайте отображается список отделений в порядке близости к клиенту, краткая информация о каждом.
Когда пользователь выбирает отделение, система заносит его в расписание, корректируя время для остальных пользователей.
Пользователь может построить маршрут до отделения прямо на сайте.

Демо: [http://proxy.koteyko.space/](http://proxy.koteyko.space/)

## Развитие:
построение тепловой карты пользователей и их потребностей в услугах
использовать камеры наблюдения в отделениях для измерения времени ожидания в очередях
возможность более точно рассчитывать загруженность

## Используемый стек:
- Docker
- nginix
- Flask
- Fastapi
- PostgreSQL
- pytorch

- React
- AntD
- Yandex Maps API

## Инструкции по запуску:
Веса модели: [https://drive.google.com/file/d/1xsITYiZvcsIzx0cr-GiBx5ytDIcvlgzP/view?usp=sharing] должны лежать в каталоге app

Далее для запуска нужно установить зависимости и скомпилировать фронтенд:
```
cd app
npm install .
npm run build
cd ..
docker compose up --build
docker compose up --build
```

На 80 порту будет сайт.
