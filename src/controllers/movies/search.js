"use strict";

const filter = require('../../services/filter_movie');
const Movies = require('../../models/movies');
const helper = require('../../helper/');

function searchTag(req, res ){

  let term = req.params.term;

  filter(term, Movies)
    .then(movies => {
      return helper.sendMessage(res, 200, true, 'OK', movies);
    })
    .catch(err => {
     return helper.sendMessage(res, err.code, false, err.message );
    })

}

module.exports = searchTag;
