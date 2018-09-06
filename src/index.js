'use strict'

// set up
import mongoose from 'mongoose';
import server from './server/server';

// connect mongo and server nodejs
mongoose.connect(process.env.URLDB, {
 useNewUrlParser: true
},(err, res)=> {
  if( err ) return console.log(`Error al conectar a la base de datos ${err}`)

  console.log('Conexion a la base de datos establecida')

  server.listen(process.env.PORT, ()=> {
    console.log(`App running on port: ${process.env.PORT}`)
  })
})
