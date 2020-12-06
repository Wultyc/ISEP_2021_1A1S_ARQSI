const dotEnvLoader = require ('../../loaders/dotenv')
dotEnvLoader();

const { MongoClient } = require('mongodb')
exports.useInTest = function() {
    before(async function connectToTestDB() {
        const mongoClient = await MongoClient.connect(
            process.env.DB_CONNECT,
           {
                useNewUrlParser: true,
                useUnifiedTopology: true
                
            },
        )
        const db = mongoClient.db('redes-test')
        this.mongoClient = mongoClient
        this.db = db
    })
    beforeEach(function dropTestDB() {
        return this.db.dropDatabase()
    })
    after(function disconnectTestDB() {
        return this.mongoClient.close()
    })
}