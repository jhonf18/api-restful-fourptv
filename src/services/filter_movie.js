"use strict";


function filter(term, Movies){

  return new Promise((resolve, reject)=> {

    // let regex = new RegExp(term, 'i');

    // Movies.find({ name: regex })
    Movies.find({
        name: {
          $regex: `.*${term}`,
          $options: 'i'
        }
      })
      .exec((err, movies)=> {
        if(err) return reject({ code: 500, message: err });

        if(!movies || movies === undefined || movies === null) return reject({ code: 401, message: 'No se ha encontrado ninguna pelicula el termino que ingresaste' });

        return resolve({ code: 200, movies });
      });
  });
}

module.exports = filter;

