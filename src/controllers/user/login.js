'use strict'

const passport = require('passport');
const helper = require('../../helper');

function loginUser (req, res, next){

  passport.authenticate('local', (err, userLog)=> {

    if(err) return helper.sendMessage(res, 500, `Ha ocurrido un error inesperado... ${err}`);

    if(userLog.code === 401 || !userLog) return helper.sendMessage(res, 404, 'Correo y clave no son válidas.');

    return req.logIn(userLog, err => {
      if(err) return helper.sendMessage(res, 500, `Ha ocurrido un error: ${err}`);

      let user = {
        id: userLog.id,
        name: userLog.name,
        email: userLog.email,
        avatar: userLog.avatar
      }

      helper.sendMessage(res, 200, 'Login exitoso', user);

    })
  })(req, res, next)
}


module.exports = loginUser;
