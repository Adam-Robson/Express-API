# Express-API

## Scripts

`npm start`             starts the app - should only be used in production as changes will not get reloaded
`npm run start:watch`   runs the app using `nodemon` which watches for changes and reloads the app
`npm test`              runs the tests once
`npm run test:watch`    continually watches and runs the tests when files are updated
`npm run setup-db`      sets up the database locally
`npm run setup-heroku`  sets up the database on heroku

## Routes

`/api/v1/users`          `POST`       `{email: 'example@test.com', password: '123456'}`
`api/v1/users/sessions`  `POST`       `{email: 'example@test.com', password: '123456'}`
`/api/v1/users/me`       `GET`        Returns current user
`/api/v1/users`          `GET`        Authorized endpoint - returns all users for admin
`api/v1/users/sessions`  `DELETE`     Deletes a user session

`/api/v1/items`           `POST`      `{title: '', create_at: '', body: '', completed: boolean, user_id: int}`
`/api/v1/items/:id`       `PUT`       Updates an item
`/api/v1/items`           `GET`       Returns all items
`/api/v1/items/:id`       `DELETE`    Deletes an item

