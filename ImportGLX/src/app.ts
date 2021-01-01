import {initApp} from './loaders'
import express from 'express'
import {config} from 'node-config-ts'

async function startServer() {

  const app: express.Application = express();

  await initApp(app);

  const appPort: number = process.env.APP_PORT || config.app.defaultServerPort

  app.listen(appPort, () => {
    console.log(`Server is up and running on port ${appPort}`);
  });

}

startServer();