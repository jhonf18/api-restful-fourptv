"use strict";
const BlackList = require('../../models/black_list');

function logoutUser (req, res) {

  const token = req.get('token');

  //Token a guardar
  const saveToken = new BlackList({
    token
  });

  saveToken.save(err => {
    if(err) return res.json({ ok: false, message: 'Ha ocurrido un error ' });

    res.status(200).json({ ok: true, message: 'Se ha cerrado la sesion correctamente' });
  })

}


module.exports = logoutUser;
