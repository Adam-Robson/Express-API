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
app.use(express.static(path.join(__dirname, 'public')));
// App routes
app.use('/api/v1/users', require('./controllers/users'));
app.use('/api/v1/items', require('./controllers/items'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
