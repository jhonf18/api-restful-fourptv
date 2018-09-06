"use strict";


const upload_movie = require('./upload');
const search_tag = require('./search');
const sendVideo = require('./send_video');
const home = require('./home');

module.exports = {
  upload_movie,
  search_tag,
  sendVideo,
  home
}
