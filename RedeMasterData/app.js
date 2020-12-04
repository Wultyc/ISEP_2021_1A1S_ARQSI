const loaders = require('./src/loaders');
const express = require('express');
const config = require("config");

async function startServer() {

  const app = express();

  await loaders(app);

  const appPort = process.env.APP_PORT || config.get("app.defaultServerPort")

  app.listen(appPort, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Server is up and running on port ${appPort}`);
  });
}

startServer();