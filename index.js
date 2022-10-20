// index.js

const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello World of serverless framework!')
})

module.exports.handler = serverless(app);
