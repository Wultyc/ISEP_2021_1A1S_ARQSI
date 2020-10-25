const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Imports routes
const node = require('./app/routes/node.route');

const app = express();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions))

mongoose.connect('mongodb+srv://arqsi:arqsi@cluster0.mywjf.mongodb.net/test', {
    useNewUrlParser : true  
}); 
mongoose.Promise = global.Promise;
// 'mongodb+srv://arqsi:arqsi@cluster0.mywjf.mongodb.net/test',

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/nodes', node);

let port = 1234;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});