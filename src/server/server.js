'use strict'

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const path = require('path');

//Dependencia de desarrollo
const cors = require('cors');

const config = require('../config/config')
const bodyParser = require('body-parser')
const api = require('../routes')

const server = express()

// sessions
server.use(session({
  secret: config.SECRET_SESSION,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    url: config.DB,
    autoReconnect: true
  })
}))
//  init passport
server.use(passport.initialize())
server.use(passport.session())

/**
  Dependencia de desarrollo
**/
// server.use(cors());
server.use(cors());

// config request
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))

// use we routes
server.use('/api', api)

//set files statics
server.use(express.static(path.resolve(__dirname, './public')))
// server.set('views', __dirname + '/views')

server.get('/upload', function(req, res) {
  let form = `<form method="post" enctype="multipart/form-data" action="api/user/upload/avatar/5b7b31a200d8c72298497153">
    <input type="file" name="file"> <br>
    <input type="submit" value="Subir archivo">`

  res.send(form);
})

module.exports = server
