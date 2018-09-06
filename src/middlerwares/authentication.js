"use strict";

const jwt = require('jsonwebtoken');
const helper = require('../helper');
const BlackList = require('../models/black_list');

//Servicio para crear nuestro token
function createToken(user){

  let token = jwt.sign({
    user
  }, process.env.SECRET, { expiresIn: process.env.CADUCIDAD_TOKEN, algorithm: 'HS512'})

  return token;
}

//===============================
// Middlerware de autentificacion
//===============================
function verifyToken (req, res, next){

  let token = req.get('token');

  //buscar el token en la lista negra
  BlackList.findOne({ token })
    .exec((err, tokenDoc)=> {
      if(err) return helper.sendMessage(res, 500, false, 'Error de autenticacion', err);

      //si el token existe en la lista negra
      if( tokenDoc !== null || tokenDoc){
        return helper.sendMessage(res, 401, false, 'Token de autenticación no válido, la sesion ha sido cerrada');

      } else {

        jwt.verify(token, process.env.SECRET, (err, decoded)=> {
          if(err) return helper.sendMessage(res, 404, false, 'Token no válido');

          req.user = decoded.user;
          next();
        })
      }
    })
}


//verificar archivos

function verifyTokenFile(req, res, next){

  let token = req.query.token;

  //Buscar en la lista negra el token
  BlackList.findOne({token})
    .exec((err, tokenDoc)=> {
      if(err) return helper.sendMessage(res, 500, false, 'Error de autenticacion', err);

      //si el token existe en la lista negra
      if( tokenDoc !== null || tokenDoc){
        return helper.sendMessage(res, 401, false, 'Token de autenticación no válido, la sesion ha sido cerrada');

      } else {

        jwt.verify(token, process.env.SECRET, (err, decoded)=> {
          if(err) return helper.sendMessage(res, 404, false, 'Token no válido');

          req.user = decoded.user;
          next();
        })
      }
    })
};


module.exports =  {
  createToken,
  verifyToken,
  verifyTokenFile
}
