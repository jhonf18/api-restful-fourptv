"use strict";

const User = require('../../models/user');
const helper = require('../../helper');

function getUser(req, res){
  const idUser = req.params.idUser

  if(!idUser || idUser === undefined || idUser.length == 0) return helper.sendMessage(res, 400, 'Id de usuario no válido.');

  helper.findUserId(User, idUser)
    .then( user => {
      helper.sendMessage(res, 200, 'Se ha obtenido los datos del usuario correctamenete', user );
    })
    .catch(err => helper.sendMessage(res, err.code, err.message));
}

module.exports = getUser;
