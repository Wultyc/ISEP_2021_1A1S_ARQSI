const mongoose = require("mongoose")

const mongooseConnection = async function() {
    const connection = await mongoose.connect(
        process.env.DB_CONNECT,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        () => console.log('Connected with database')
    );
    return connection;
}

module.exports = mongooseConnection;