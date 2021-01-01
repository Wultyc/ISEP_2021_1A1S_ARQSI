const mongoose = require("mongoose")
const {config} = require("node-config-ts")

const mongooseLoader = async function() {
    const connection = await mongoose.connect(
        process.env.DB_CONNECT || config.app.defaultMongooseConnString,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        },
        () => console.log('Connected with database'),
        err => console.log(`Error during MongoDB connection: ${err}`)
    );
    mongoose.set('debug', config.logs.mongoose.debug);
    return connection;
}

export {mongooseLoader};