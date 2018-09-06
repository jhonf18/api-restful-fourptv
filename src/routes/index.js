'use strict'
/*SET UP*/
const express = require('express');
const UserController = require('../controllers/user');
const MovieController = require('../controllers/movies');

const auth = require('../middlerwares/authentication');
const api = express();

//*****************  ROUTES OF USER **********************

// **** POST **** //
api.post('/user/signup', UserController.registerUser);
api.post('/user/signin', UserController.loginUser );
api.post('/user/google/signin', UserController.googleLogin);
api.post('/user/password/verify',  auth.verifyToken,UserController.verifyPassword);
api.post('/user/upload/avatar', auth.verifyToken, UserController.upload_imageUser);
api.post('/user/pay/paypal', auth.verifyToken, UserController.pay_paypal);
api.get('/user/pay/paypal/success', auth.verifyToken, UserController.pay_paypal_success);

// **** GET **** //
api.get('/user/signout', auth.verifyToken, UserController.logoutUser);
api.get('/user/get', auth.verifyToken, UserController.getUser);
api.get('/user/image/:img', auth.verifyTokenFile, UserController.send_image);

// **** PUT **** //
api.put('/user/edit', auth.verifyToken, UserController.editUser);
api.put('/user/password/change', auth.verifyToken,  UserController.changePassword);

// **** DELETE **** //



//*****************         ROUTES OF MOVIES             *************** */

//=================
// ROUTES POST
//==============
api.post('/movies/upload', MovieController.upload_movie);

//=================
// ROUTES GET
//=================
api.get('/movies/search/:term', auth.verifyToken, MovieController.search_tag);
api.get('/movies/video/:video', auth.verifyTokenFile, MovieController.sendVideo);
api.get('/movies/home', auth.verifyToken, MovieController.home);


module.exports = api;
