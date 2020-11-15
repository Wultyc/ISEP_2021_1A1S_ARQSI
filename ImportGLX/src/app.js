const loaders = require('./loaders');
const express = require('express');

async function startServer() {

  const app = express();

  await loaders(app);

  app.listen(process.env.APP_PORT, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Server is up and running on port ${process.env.APP_PORT}`);
  });
}

startServer();