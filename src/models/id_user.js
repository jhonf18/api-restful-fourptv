'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IdClient = new Schema({
  name: {type: String},
  email: {type: String, unique: true}
})

module.exports = mongoose.model('IdUser', IdClient)
