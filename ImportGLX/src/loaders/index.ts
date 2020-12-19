import {dotEnvLoader} from './dotenv'
import {expressLoader} from './express'
import {mongooseLoader} from './mongoose'

const initApp = async function(expressApp) {

  dotEnvLoader();
  console.log('dotenv Intialized')

  await mongooseLoader()
  console.log('MongoDB Intialized')

  expressLoader(expressApp)
  console.log('Express Intialized')
}

export {initApp};