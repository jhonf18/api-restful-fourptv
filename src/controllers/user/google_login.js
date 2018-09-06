"use strict";

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const User = require('../../models/user');
const helper = require('../../helper');
const auth = require('../../middlerwares/authentication');

//configuraciones de google
async function verify( token ) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience:process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();

  return  {
    id: payload.sub,
    name: payload.name,
    email: payload.email,
    avatar: payload.picture,
    google: true
  }

}


async function login(req, res){

  let token = req.body.idtoken;

  if(token === null || token === undefined) return helper.sendMessage(res, 403, false, 'Token no válido');

  let googleUser = await verify(token)
    .catch( e => {
      return helper.sendMessage(res, 403, false, 'Token no válido', e);
    });

  User.findOne({ email: googleUser.email }, (err, user)=> {

    if(err) return helper.sendMessage(res, 500, false, 'Ha ocurrido un error inesperado', err);

    //Verificamos si existe el usuario en la db
    if(user) {

      if(user.google === false) {
        return helper.sendMessage(res, 400, false, 'Debe usar su autentificación normal...');

      } else {
        let token = auth.createToken(user.id);

        return helper.sendMessage(res, 200, true, 'Has inciado sesion correctamente', user, token);
      }

    } else {
      //Si el usuario no existe en nuestra base de datos

      let user = new User({
        google: true,
        name: googleUser.name,
        email: googleUser.email,
        id: googleUser.id,
        avatar: googleUser.avatar,
        password: ':)'
      });

      user.save(err => {
        if(err) return helper.sendMessage(res, 500, false, 'Ha ocurrido un error inesperado', err);

        let token = auth.createToken(user.id);

        return helper.sendMessage(res, 200, true, 'Has inciado sesion correctamente', user, token);

      })
    }
  })

}

module.exports = login;
