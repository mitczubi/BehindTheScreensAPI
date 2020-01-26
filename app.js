const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Behind the Screens'
  });
});

app.listen(port, (req, res) => {
  console.log(`Our server is live on ${port}`)
});
