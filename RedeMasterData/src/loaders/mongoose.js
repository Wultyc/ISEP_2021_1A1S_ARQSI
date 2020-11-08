const mongoose = require("mongoose")
const config = require("config")

const mongooseConnection = async function() {
    const connection = await mongoose.connect(
        process.env.DB_CONNECT,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        },
        () => console.log('Connected with database'),
        err => console.log(`Error during MongoDB connection: ${err}`)
    );
    mongoose.set('debug', config.get('logs.mongoose.debug'));
    return connection;
}

module.exports = mongooseConnection;