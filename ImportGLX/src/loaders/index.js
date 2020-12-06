const dotEnvLoader = require('./dotenv')
const expressLoader = require('./express')
const mongooseLoader = require('./mongoose')

const initApp = async function(expressApp) {

  dotEnvLoader();
  console.log('dotenv Intialized')

  await mongooseLoader()
  console.log('MongoDB Intialized')

  expressLoader(expressApp)
  console.log('Express Intialized')

  // ... more loaders can be here
}

module.exports = initApp