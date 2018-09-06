'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MoviesSchema = new Schema({
  gender: ['terror', 'comedia', 'suspenso', 'drama', 'musical', 'fantasia'],
  name: String,
  image: String,
  video: String,
  description: String,
  created_at: {type:Date,default: Date.now()},
  private_mv : {type: Boolean, default: true}
});

module.exports = mongoose.model('Movies', MoviesSchema);
