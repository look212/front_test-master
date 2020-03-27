var express    = require('express');
var app        = express();
var path       = require('path');
var bodyParser = require('body-parser');

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type');
  next();
});

// WEB
app.use(express.static(path.join(__dirname, '../client')));

// API
app.use('/api/user', require('./api/user'));

// Server
const PORT = 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);