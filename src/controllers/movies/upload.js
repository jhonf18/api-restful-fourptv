"use strict";

const User = require('../../models/user');
const Movies = require('../../models/movies');
const helper = require('../../helper');
const uuid = require('uuid/v4');

let id = uuid();

function upload_movie(req, res){
  //Obtener los datos del usuario
  let email = req.body.email.toLowerCase(),
      password = req.body.password,
      gender = req.body.gender.toLowerCase(),
      description = req.body.description,
      private_mv = req.body.private,
      name = req.body.name;

  User.findOne({ email })
  .then(user => user.comparePassword(password))
  .then(result => {

    // Obtener los datos para iniciar la subida del archivo
    let movie = req.files.fileMovie,
      image = req.files.fileImage;

      //Validar si hay algun archivo
      if(!req.files || req.files === undefined) return helper.sendMessage(res, 401, false, 'No se ha encontrado ningun archivo por subir');

      //obtener la extension y armar el nombre completo
    let extMovie = helper.getFileExtension(movie.name),
      extImg = helper.getFileExtension(image.name),
      nameMovie = `${id}_mv.${extMovie}`,
      nameImg = `${id}_img.${extImg}`;


    // Extensiones permitidas
    let extValidMovie = ['mp4', 'webm', '3gp'];
    let extValidImg = ['jpg', 'png', 'jpeg', ];

    // Validacion de las extensiones
    if( extValidMovie.indexOf( extMovie ) < 0) return helper.sendMessage(res, 401, false, 'EL formato del el vidoe no es permitido');

    if( extValidImg.indexOf( extImg ) < 0 ) return helper.sendMessage(res, 401, false, 'El formato de la imagen no es permitido');

    //Cambiar la ruta del video
    movie.mv(`./src/upload/movies/video/${nameMovie}`, err => {
      if(err) return res.status(500).send({ ok: false, message : err });
      //Cambiar la ruta de la imagen
      image.mv(`./src/upload/movies/img/${nameImg}`, err => {
        if(err) return res.status(500).send({ ok: false, message: err });

        let movies = new Movies({
          name: name,
          gender,
          video: `${nameMovie}`,
          image: `${nameImg}`,
          description,
          private_mv
        });

        movies.save(err => {
          if(err) return helper.sendMessage(res, 500, false ,'Error al guardar el video en la bd' + err);

          return res.status(200).json({ok: true, message: 'El video ha sido subido y guardado correctamente'});
        })
      })
    });

  })
  .catch(err => {
    if(err.code) return helper.sendMessage(res, err.code, false ,err.message);

    return helper.sendMessage(res, 401, false ,`El email: ${email} no existe en la base de datos o no estás autorizado para ingresar a este sitio.`);
  });
}

module.exports = upload_movie;
