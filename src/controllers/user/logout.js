"use strict";

function logoutUser (req, res) {

  req.session.destroy(function(err){
    if(err) return res.status(500).send({message: `Ha ocurrido un error al cerrar la sesion ${err}` });

    req.logout()
    res.status(200).send({message: 'Signout exitoso'})
  })
}


module.exports = logoutUser;
