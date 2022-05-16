const express = require('express');
const app = express();
const errorMiddlewire = require('./middlewires/error/error');
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());

//Import Routes
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');

//All Routes
require('./routes')(app);

//Middlewire
app.use(errorMiddlewire);//for error

module.exports = app;