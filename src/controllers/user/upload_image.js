"use strict";

const service = require('../../services/upload_image');
// const helper = require('../../helper');

function uploadImage(req, res) {

  let id = req.params.idUser;

  service.uploadImage(req,id)
    .then(user => {
      res.status(200).send({
        message: 'La imagen se ha subido correctamente',
        user: {
          name: user.name,
          email: user.email,
          avatar: user.avatar
        }
      })
    })
    .catch(err => res.status(401).send({ message: `Ha ocurrido un error ${err}` }));

}


module.exports = uploadImage;
