// Required all controllers


const changePassword = require('./change_pwd');
const editUser = require('./edit');
const getUser = require('./get');
const loginUser = require('./login');
const logoutUser = require('./logout');
const registerUser = require('./register');
const upload_imageUser = require('./upload_image');
const verifyPassword= require('./verify');
const pay_paypal = require('./paypal').pay_paypal;
const pay_paypal_success = require('./paypal').pay_paypal_success;
const send_image = require('./send_image');
const googleLogin = require('./google_login');

module.exports = {
  changePassword,
  editUser,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  upload_imageUser,
  verifyPassword,
  pay_paypal,
  pay_paypal_success,
  send_image,
  googleLogin
}
