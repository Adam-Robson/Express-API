const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5432'],
    credentials: true
  })
);
// App routes
app.use('/api/v1/users', require('./controllers/users'));
app.use('/api/v1/todos', require('./controllers/todos'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
