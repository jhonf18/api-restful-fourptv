'use strict';

// set up
const User = require('../models/user');
const helper = require('../helper');
const fs = require('fs');
const path = require('path');

//Funcion de ayuda para eliminar archivos no necesitados
function deleteFile(nameFile){
  if(nameFile !== 'default_profile.png') {
    let pathImage = path.resolve(__dirname, `../public/upload/user/${nameFile}`);

    if( fs.existsSync(pathImage ) ) {
      fs.unlinkSync(pathImage);
    }
  }
}

//Servicio  de subir imagen
function uploadImage(req, idUser){

return new Promise((resolve, reject)=> {

  let img = req.files.image;


  if(!req.files || req.files === undefined) return reject({ code: 401, message: 'No se ha encontrado ningun archivo por subir' });

  let nameImg = img.name;
  let ext = helper.getFileExtension(nameImg);
  let fileName = `${idUser}_${new Date().getTime()}.${ext}`;

  let extValid = ['jpg', 'png', 'jpeg'];

  if( extValid.indexOf(ext) < 0 ) return reject({ code: 401, message: 'La extension de la imagen que quiere subir no es permitida' });

  img.mv(`./src/upload/user/${fileName}`, err => {
    if(err) return reject({ code: 500, message: 'Ha ocurrido un error al subir la imagen' });

    //buscar el usuario y actualizarlo

    helper.findUserId(User, idUser)
      .then( user => {

        if(!user) return reject({ code: 404 , message: 'No se puede subir la imagen' });

        deleteFile(user.avatar);

        return helper.findByIdAndUpdate(User, user , { avatar: fileName });
      })
      .then( user => resolve(user) )
      .catch(err => reject(err));
    })

  })
}

module.exports = {uploadImage} ;
