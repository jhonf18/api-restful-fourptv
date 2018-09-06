"use strict";

const User = require('../../models/user');
const helper  =require('../../helper/index');

function editUser(req, res ){

  const idUser = req.user.id,
        user_edit = req.body;

  if(!idUser || idUser === undefined ) return helper.sendMessage(res, 401, false, `No se ha encontrado el id del usuario...`);

  if(req.body === null || req.body === '' || req.body === undefined ) return helper.sendMessage(res, 401, false ,'No se ha podido editar el usuario. Campos incorrectos');

  //cannot edit email and pwd
  delete user_edit.password;
  delete user_edit.email;

  helper.findUserId(User, idUser)
    .then(user => {
      return helper.findByIdAndUpdate(User, user, user_edit);
    })
    .then(user => {
      return helper.sendMessage(res, 200, true ,`Se ha editado correctamente el usuario`, user );
    })
    .catch(err => helper.sendMessage(res, err.code, false ,err.message));
}

module.exports = editUser;
