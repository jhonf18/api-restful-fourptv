'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    email: { type: String, unique: true, lowercase: true },
    name:  String,
    avatar: String,
    password: { type: String },
    id: {type: String, unique: true}
});

UserSchema.pre('save', function(next){
  let user = this

  if(!user.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt)=> {
      if(err) return next(err)

    bcrypt.hash(user.password, salt, null, (err, hash)=> {
        if(err) return next(err)

        user.password = hash
        next()
    })
  })
})

UserSchema.methods.encryptPassword = function(password){

  return new Promise((resolve, reject)=> {

    const salt = bcrypt.genSaltSync(10);
    const newPassword = bcrypt.hashSync(password, salt);

    return resolve({password: newPassword});
  })
}

UserSchema.methods.comparePassword = function(password){

  return new Promise((resolve, reject)=> {

    if(!bcrypt.compareSync(password, this.password)) return reject({code: 401, message: 'Contraseña incorrecta'});

    return resolve({code: 200, message: 'OK'});
  })
}

module.exports = mongoose.model('User', UserSchema);
