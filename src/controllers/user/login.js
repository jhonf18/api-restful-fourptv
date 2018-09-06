'use strict';

// const passport = require('passport');
const helper = require('../../helper');
const User = require('../../models/user');
const auth = require('../../middlerwares/authentication');

function loginUser (req, res, next){

  let email = req.body.email,
    password = req.body.password,
    userLog;

  User.findOne({email})
    .then( user => {
      if(user === undefined || user === null){
        return helper.sendMessage(res, 401, false ,'(Usuario) o contraseña incorrecta');
      } else {

        userLog = user;
        return user.comparePassword(password)
          .then(result => {
            //Obteniendo el token
            let token = auth.createToken(userLog);

            let createdUser = {
              id: userLog.id,
              name: userLog.name,
              email: userLog.email,
              avatar: userLog.avatar
            };

            helper.sendMessage(res, 200, true, 'Login exitoso', createdUser, token);

          })
          .catch(err => {
            return helper.sendMessage(res, 404, false, 'Email o (clave) incorrectos', err);
          });
      }
    })
    .catch( err => {
      helper.sendMessage(res, 500,false ,`Ha ocurrido un error inesperado`, err);
    });

}


module.exports = loginUser;
