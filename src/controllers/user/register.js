"use strict";

const User = require('../../models/user');
const IdUser = require('../../models/id_user');
const helper = require('../../helper');
const validator = require('email-validator');

const auth = require('../../middlerwares/authentication');

function registerUser(req, res){

  let email = req.body.email.toLowerCase(),
    name = req.body.name,
    idUser = new IdUser({
      name: name,
      email: email
    });

  if(email === undefined || name === undefined ) return helper.sendMessage(res, 401, false, 'Los campos nombre y email están vacíos, intentalo denuevo.');

  if(!validator.validate(email)) return helper.sendMessage(res, 401, false ,`El email: ${email}, no es un email válido. `);

  IdUser.findOne({email: req.body.email}, (err, doc)=> {
    if(err) return helper.sendMessage(res, 500, false ,`Ha ocurrido un error inesperado`, err);

    if(doc) return helper.sendMessage(res, 401, false, `El id ya está ocupado, intentalo de nuevo por favor...Al parecer el correo: ${email} ya está en uso`);

    idUser.save(err => {
      if(err) return helper.sendMessage(res, 500, false ,`Ha ocurrido un error inesperado`, err);

      IdUser.findOne({email: req.body.email}, (err, userId)=> {
        if(err) return helper.sendMessage(res, 500, false,`Ha ocurrido un error inesperado`, err);

        let user =  new User({
          id: userId._id,
          email: req.body.email,
          name: req.body.name,
          avatar: 'default_profile.png',
          password: req.body.password
        });

        user.save( err => {
          if( err ) return helper.sendMessage(res, 500,false ,`Ha ocurrido un error`, err);

          let token = auth.createToken(user);

          return res.status(200).json({
            message: 'Registro y Login Exitoso',
            data: {
              id: user.id,
              name: user.name,
              email: user.email,
              avatar: user.avatar,
            },
            token
          })
        })
      })
    })
  })
}


module.exports = registerUser;
