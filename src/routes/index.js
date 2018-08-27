'use strict'
/*SET UP*/
const express = require('express');
const UserController = require('../controllers/user');
const passportConfig = require('../config/passport');


const api = express();

//*****************  ROUTES OF USER

// **** POST **** //
api.post('/user/signup', UserController.registerUser);
api.post('/user/signin', UserController.loginUser );
api.post('/user/password/verify/:idUser',  UserController.verifyPassword);
api.post('/user/upload/avatar/:idUser', passportConfig.isAuth, UserController.upload_imageUser);

// **** GET **** //
api.get('/user/signout', passportConfig.isAuth, UserController.logoutUser);
api.get('/user/get/:idUser', passportConfig.isAuth, UserController.getUser);

// **** PUT **** //
api.put('/user/edit/:idUser', passportConfig.isAuth, UserController.editUser);
api.put('/user/password/change/:idUser',passportConfig.isAuth,  UserController.changePassword);

// **** DELETE **** //


module.exports = api;
