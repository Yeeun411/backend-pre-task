const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const routes = require('./routes');

app.use(bodyParser.json());
app.use('/', routes);

module.exports = app;
