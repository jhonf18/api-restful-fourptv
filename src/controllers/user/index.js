// Required all controllers


const changePassword = require('./change_pwd');
const editUser = require('./edit');
const getUser = require('./get');
const loginUser = require('./login');
const logoutUser = require('./logout');
const registerUser = require('./register');
const upload_imageUser = require('./upload_image');
const verifyPassword= require('./verify');


module.exports = {
  changePassword,
  editUser,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  upload_imageUser,
  verifyPassword
}
