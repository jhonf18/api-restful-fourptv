"use strict";

const User = require('../../models/user');
const helper = require('../../helper');

function verifyPassword(req, res){
  let idUser = req.user.id;
  let password = req.body.password;

  if(!idUser || idUser === '' || idUser === undefined) return helper.sendMessage(res, 401, false ,'Id no válido');

  helper.findUserId(User, idUser)
    .then(user => {
      return user.comparePassword(password);
    })
    .then(data => helper.sendMessage(res, data.code, true, data.message))
    .catch(err => helper.sendMessage(res, err.code, false, err.message));
}

module.exports = verifyPassword;
