# Express-API

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://adamrobson.vercel.app/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/adamrayrobson)

This is a backend application built with [Express](https://expressjs.com/) and [Postgres](https://www.postgresql.org/).

## Table of Contents

- [Express-API](#express-api)
  - [Table of Contents](#table-of-contents)
  - [General Information](#general-information)
  - [Features](#features)
  - [Run Locally](#run-locally)
  - [Routes](#routes)
  - [Technologies Used](#technologies-used)
  - [Authors](#authors)
  - [Acknowledgements](#acknowledgements)
  - [Contact](#contact)


## General Information

This project was built as part of my time in the July 2022 cohort
at Alchemy Code Lab, in Portland, Oregon.

## Features

This backend application uses Express to create a server and uses Postgres to create a database.  It includes authorization and authentication for creating and managing a user base, as well as the functionality to Create Read Update and Delete items stored in the database.

## Run Locally

  - `npm start`             should be used for production; changes will not get reloaded
  - `npm run start:watch`   runs the app using `nodemon`
  - `npm test`              runs the tests once
  - `npm run test:watch`    continually watches and runs the tests when files are updated
  - `npm run setup-db`      sets up the database locally
  - `npm run setup-heroku`  sets up the database on heroku

## Routes

  - `/api/v1/users`          `POST`       `{email: 'example@test.com', password: '123456'}`
  - `/api/v1/users/sessions`  `POST`      `{email: 'example@test.com', password: '123456'}`
  - `/api/v1/users/me`       `GET`        Returns current user
  - `/api/v1/users`          `GET`        Authorized endpoint - returns all users for admin
  - `/api/v1/users/sessions`  `DELETE`    Deletes a user session

  - `/api/v1/items`           `POST`      `{title: '', created_at: '', body: '', completed: boolean, user_id: int}`
  - `/api/v1/items/:id`       `PUT`       Updates an item
  - `/api/v1/items`           `GET`       Returns all items
  - `/api/v1/items/:id`       `DELETE`    Deletes an item


## Technologies Used

- JavaScript
- Express
- Babel
- Node
- Postgres
- Postman
- Jest
- Nodemon
- ESLint
- Prettier
- GitHub Actions


## Authors

> [@Adam-Robson](https://www.github.com/Adam-Robson)


## Acknowledgements

Thanks to Alchemy Code Lab for providing the instructor [Julie Nisbet](https://www.github.com/julienisbet),
  who created the template for the project, and was crucial in debugging along the way!


## Contact

Feel free to reach out! I can be messaged through LinkedIn by
clicking on the badge above, or by emailing me at adamray312@gmail.com
