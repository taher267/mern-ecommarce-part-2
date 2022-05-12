const express = require('express');
const app = express();
const errorMiddlewire = require('./middlewires/error/error');
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
//Routes Import
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
//Product Routes
app.use('/api/v1', product);

//Product Routes
app.use('/api/v1', user);

//Middlewire for error
app.use(errorMiddlewire);

module.exports = app;