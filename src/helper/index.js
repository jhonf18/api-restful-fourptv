"use strict";


const sendMessage =  (res, code, message, data  ) => {

  if(data !== undefined) {
    return res.status(code).send({ message: message, data: data })
  } else {
    return res.status(code).send({ message: message });
  }
};

const findUserId = (User , idUser) => {

  return new Promise((resolve, reject)=> {

    User.findOne({id: idUser},
      (err, user) => {

      if(err) return reject({code: 500, message:`Ha ocurrido un error inesperado ${err}` });

      if(!user) return reject({code: 401, message: `El id ${idUser} no pertenece a ningun usuario.`});

      return resolve(user);
    });
  })
};

const findByIdAndUpdate = (User, user, Objedit)=> {

  return new Promise((resolve, reject)=> {

    User.findByIdAndUpdate(user._id, Objedit , (err) => {

      if(err) return reject({code: 200, message: `Ha ocurrido un error inesperado al cambiar las contraseñas: ${err} `});

      findUserId(User, user.id)
        .then(user => {
          resolve(user);
        })
        .catch(err => reject(err));
    })
  })
};

module.exports = {
  sendMessage,
  findUserId,
  findByIdAndUpdate,
}
