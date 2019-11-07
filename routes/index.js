const Route = require('express').Router();
const postRoute = require('./postRoute');
// const userRoute = require('./userRoute');

// Route.use('/users', userRoute);
Route.use('/posts', postRoute);

module.exports = Route;