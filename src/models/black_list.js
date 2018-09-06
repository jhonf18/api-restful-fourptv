const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ttl = require('mongoose-ttl');

const BlackList = new Schema({
  token: String
});

BlackList.plugin(ttl, { ttl: '1d' })

module.exports = mongoose.model('BlackList', BlackList);
