//Config env variables
const dotenv = require('dotenv')
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Imports routes
const node = require('./routes/node.route');
const line = require('./routes/line.route');

const app = express();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions))

//Connect with Database
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log('Connected with database')
);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/node', node);
app.use('/line', line);

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
});