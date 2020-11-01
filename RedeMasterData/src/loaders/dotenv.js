//Config env variables
const dotenv = require('dotenv')

const dotenvLoader = function () {
    dotenv.config();
}

module.exports = dotenvLoader