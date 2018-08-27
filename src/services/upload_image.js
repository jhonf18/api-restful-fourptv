'use strict';

// set up
const formidable = require('formidable');
const fse = require('fs-extra');
const User = require('../models/user');
const helper = require('../helper');

function uploadImage(req, idUser){

  return new Promise((resolve, reject)=> {

    let form = new formidable.IncomingForm();

  //methods formidable
  form
    // parse files
    .parse(req, (err, fields, files)=> {
      console.log('Parseando files...')
    })
    // moment upload file
    .on('progress', (bytesReceived, bytesExpected) => {
      let percentCompleted = (bytesReceived / bytesExpected) * 100

      console.log(percentCompleted.toFixed(0) + '%')
    })
    // moment if exits error
    .on('error', err => {

      reject('Ha ocurrido un error al subir el archivo')
      console.log( err)
    })
    // moment finish upload
    .on('end', function(fields, file) {

      // if files correct
      if( this.openedFiles[0] == null || !this.openedFiles[0] || this.openedFiles[0] === undefined ) {

        helper.findUserId(User, idUser)
          .then(dataUser => resolve(dataUser.avatar))
          .catch(err => reject(err));

      } else {

        //set new img
        let tempPath = this.openedFiles[0].path,
            ext = this.openedFiles[0].name.split('.')[1],
            fileName = `${idUser}_${new Date().getTime()}.${ext}`,
            newLocation = `./src/public/upload/user/${fileName}`;

        fse.copy(tempPath, newLocation, err => {

          if(err) return reject(err);

          helper.findUserId(User,idUser)
            .then( user => helper.findByIdAndUpdate(User,user, {avatar: fileName}))
            .then( user => resolve(user) )
            .catch(err => reject(err));
        })
      }
    })
  })
}

module.exports = {uploadImage} ;
