import { initApp } from './loaders/index'
import express from 'express'
import { config } from 'node-config-ts'

const app: express.Application = express();

initApp(app);

const appPort: number = process.env.APP_PORT || config.app.defaultServerPort

app.listen(appPort, () => {
  console.log(`Server is up and running on port ${appPort}`);
});

export { app }
