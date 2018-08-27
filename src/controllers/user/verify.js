"use strict";

const User = require('../../models/user');
const helper = require('../../helper');

function verifyPassword(req, res){
  let idUser = req.params.idUser;
  let password = req.body.password;

  if(!idUser || idUser === '' || idUser === undefined) return helper.sendMessage(res, 401, 'Id no válido');

  helper.findUserId(User, idUser)
    .then(user => {
      return user.comparePassword(password);
    })
    .then(data => helper.sendMessage(res, data.code, data.message))
    .catch(err => helper.sendMessage(res, err.code, err.message));
}

module.exports = verifyPassword;
