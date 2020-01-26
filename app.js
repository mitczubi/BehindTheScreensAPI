const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const dotenv = require('dotenv');

// import routes
const homeRoute = require('./server/routes/index');
const mainRoutes = require('./server/routes/main');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
dotenv.config();

mongoose.connect(process.env.MONGODB, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
  })
  .catch(() => {
  });

mongoose.Promise = global.Promise;

const port = process.env.PORT || 7066;

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Behind the Screens'
  });
});

// Set up routes
homeRoute(app)
app.use('/api/', mainRoutes);

app.get('*', (req, res) => {
  res.status(400).json({
    message: 'This is Behing the Screens, please see documentation for proper routes.'
  })
})

app.listen(port);
