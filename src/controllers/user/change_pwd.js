"use strict";

const User = require('../../models/user');
const helper = require('../../helper');

function changePassword(req, res) {

  let idUser = req.params.idUser,
      password = req.body.password,
      password1 = req.body.password1,
      password2 = req.body.password2,
      user;

  if(password1 !== password2 ) return helper.sendMessage(res, 401, `Las contraseñas que quieres cambiar coinciden`);

  if(!idUser || idUser === '' || idUser === undefined) return helper.sendMessage(res, 401, `El id: ${idUser} no es válido.`);

  helper.findUserId(User, idUser)
    .then( data => {
      user = data
      return user.comparePassword(password);
    })
    .then( resp => {
      return user.encryptPassword(password1);
    })
    .then( newPassword => {
      return helper.findByIdAndUpdate(User, user, newPassword)
    })
    .then( user => {
      helper.sendMessage(res, 200, `Se ha cambiado la contraseña correctamente`, user );
    })
    .catch(err => helper.sendMessage(res, err.code, err.message));
}

module.exports = changePassword;
