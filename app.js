const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const dotenv = require('dotenv');

// import routes
const mainRoutes = require('./server/routes/main');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
dotenv.config();

mongoose.connect(process.env.MONGODB, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log(error);
  });

const port = 3000;

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Behind the Screens'
  });
});

app.use('/api/', mainRoutes);

app.listen(port, (req, res) => {
  console.log(`Our server is live on ${port}`)
});
