"use strict";

const fs = require('fs');
const path = require('path');

function sendImage(req, res ){

  let img = req.params.img;
  console.log(img);

  let pathImg = path.resolve(__dirname, `../../public/upload/user/${img}`);

  if( fs.existsSync(pathImg) ) {

    res.sendFile(pathImg);

  } else {

    let noImagePath = path.resolve(__dirname, '../../assets/img/no-image.jpg')
    res.sendFile(noImagePath);

  }
}

module.exports = sendImage;
