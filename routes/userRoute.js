const Route = require('express').Router();
const userCont = require('../controllers/userController');
const { authentication } = require('../middlewares/auth');
const multer = require('../middlewares/multer');
const gcs = require('../middlewares/gcs');

Route.get('/', authentication, userCont.findUser);
Route.post('/signup', userCont.signup);
Route.post('/signin', userCont.signin);
Route.patch('/send/:id', authentication, userCont.followingStatusFalse);
Route.patch('/upload', authentication, multer.single('image'), gcs, userCont.updateImage);
Route.patch('/change', authentication, userCont.changePassword);

module.exports = Route;