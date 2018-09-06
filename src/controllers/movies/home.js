"use strict";


const Movies = require('../../models/movies');
const User = require('../../models/user');
const helper = require('../../helper');

function home(req, res){

  const user = req.user;

  helper.findUserId(User, user.id)
    .then( user => {

      if( user.pay === true ){
        Movies.find({ private_mv: true })
          .exec((err, movies)=> {
            if(err) return helper.sendMessage(res, 500, false, 'Ha ocurrido un error inesperado al obtener las peliculas', err);

            return helper.sendMessage(res, 200, true, 'Success', movies);
          })
      } else {
        Movies.find({ private_mv: false })
          .exec((err, movies)=> {
            if(err) return helper.sendMessage(res, 500, false, 'Ha ocurrido un error inesperado al obtener las peliculas', err);

            return helper.sendMessage(res, 200, true, 'Success', movies);
          })
      }
    })
    .catch(err => helper.sendMessage(res, 500, false, 'Ha ocurrido un error', err));

}

module.exports = home;
