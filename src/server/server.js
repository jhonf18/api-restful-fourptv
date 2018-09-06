'use strict'

const express = require('express');
const session = require('express-session');
const path = require('path');
const fileUpload = require('express-fileupload');

//Dependencia de desarrollo
const cors = require('cors');
const morgan = require('morgan');

const config = require('../config/config');
const bodyParser = require('body-parser');
const api = require('../routes');

const server = express();

//=======================
// configuraciones
//=======================

 server.use(fileUpload());
 server.use(morgan('dev'));

//=======================
// Desarrollo
//=======================

server.use(cors({optionsSuccessStatus: 200}));

//=======================
// Configuracion de express
//=======================
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))

server.use('/api', api)

//========================
// Rutas de prueba
//========================

server.get('/', function(req, res) {
  console.log('renderisando ruta');
  let form = `<form method="post" enctype="multipart/form-data" action="api/movies/upload">

    <input type="file" name="fileMovie"><br>
    <input type="file" name="fileImage"> <br> <br>

    Email
    <input type="text" name="email"> <br>
    Contraseña
    <input type="text" name="password"> <br> <br>

    Nombre
    <input type="text" name="name"> <br>
    Descripcion
    <input type="text" name="description"> <br>
    private true or false
    <input type="checkbox" name="private" value="false">False<br>
    Genero
    <input type="text" name="gender">

    <input type="submit" value="Subir archivo">`

  res.send(form);
})


server.get('/home', function(req, res) {
  let form = `<form method="post" action="api/user/pay/paypal">
    <input type="submit" value="Buy">`;

  res.send(form);
})



module.exports = server
