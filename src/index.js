'use strict'

// set up
const mongoose = require('mongoose')
const config = require('./config/config')
const server = require('./server/server')

// connect mongo and server nodejs
mongoose.connect(config.DB, (err, res)=> {
  if( err ) return console.log(`Error al conectar a la base de datos ${err}`)

  console.log('Conexion a la base de datos establecida')

  server.listen(config.PORT, ()=> {
    console.log(`App running on port: ${config.PORT}`)
  })
})
