"use strict";

const User = require('../../models/user');
const helper = require('../../helper');

function getUser(req, res){
  const idUser = req.user.id;
  const user = req.user;

  if(!idUser || idUser === undefined || idUser.length == 0) return helper.sendMessage(res, 400, false ,'Id de usuario no válido.');

  helper.sendMessage(res, 200, true, 'Se ha obtenido los datos del usuario correctamente', user);
}

module.exports = getUser;
