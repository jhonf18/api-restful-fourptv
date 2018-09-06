"use strict";

const fs = require('fs');
const path = require('path');

function sendVideo (req, res) {

  const video = req.params.video;

  const pathFile = path.resolve(__dirname, `../../upload/movies/video/${video}`);
  const stat = fs.statSync(pathFile)
  const fileSize = stat.size
  const range = req.headers.range

  if (range) {

    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1;

    const chunksize = (end-start) + 1;
    const file = fs.createReadStream(pathFile, {start, end});
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, head);
    file.pipe(res);

  } else {

    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };

    fs.createReadStream(pathFile).pipe(res);
    res.writeHead(200, head);
  }
}


module.exports = sendVideo;
