const Route = require('express').Router();
const userCont = require('../controllers/userController');

Route.post('/signup', userCont.signup);
Route.post('/signin', userCont.signin);
Route.patch('/send/:id', userCont.followingStatusFalse);

module.exports = Route;