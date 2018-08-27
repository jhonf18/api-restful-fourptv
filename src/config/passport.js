'use strict'

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

//SERIALIZE USER
passport.serializeUser( (user, cb) => {
    cb(null, user._id)
});

//DESERIALIZE USER
passport.deserializeUser( (id, cb) => {
    User.findById( id, (err, user)=> {
        cb(err, user)
    })
});

//LOCAL STRATEGY
passport.use( new LocalStrategy(
  {usernameField: 'email',},
  (email, password, cb)=> {

    User.findOne({email}, (err, user)=> {
      if(err) return cb(null, false, {message: `Ha ocurrido un error: ${err}`})
      if(!user) return cb(null, false, {message: `Este email: ${email} no está registrado`})

    user.comparePassword(password)
      .then(result => {

        return cb(null, user);
      })
      .catch(err => cb(false, err));

    })
  }
));

module.exports.isAuth = (req, res, next)=> {

    if(req.isAuthenticated()) {
      return next();
    } else {
      return res.send({
        message: `Datos de la sesion no válidos, sesion cerrada...`
      });
    }
}
