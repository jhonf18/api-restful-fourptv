"use strict";

const service = require('../../services/upload_image');
const User = require('../../models/user');

function uploadImage(req, res) {

  let id = req.user.id;
//Verificando usuario
  User.findOne({ id: id }, (err, user )=> {

    if(err) return res.status(500).json({
      ok: false,
      message: 'Ha ocurrido un error inesperado...',
      data: err
     });

     if(!user || user === null ) return res.status(401).json({
      ok: false,
      message: 'No se ha encontrado ningun usuario con el id ingresado'
     });

     //Utilizar el servicio de subida de imagen
    service.uploadImage(req,id)
    .then(user => {
      res.status(200).json({
        ok: true,
        message: 'La imagen se ha subido correctamente',
        data: {
          name: user.name,
          email: user.email,
          avatar: user.avatar
        }
      });
    })
    .catch( err => res.status(401).json({ message: `Ha ocurrido un error`, data: err.message }));
  })
}


module.exports = uploadImage;
