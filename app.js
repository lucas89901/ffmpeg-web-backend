const express = require('express');

const morgan = require('morgan');

const port = 3000;
const app = express();
const apiRouter = require('./api');

app.use(morgan('dev'));

app.use('/api', apiRouter);

app.listen(port);
