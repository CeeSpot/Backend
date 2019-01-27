'use strict';
var fs = require('fs');
const moveFile = require('move-file');

exports.fileUpload = function (req, res, file) {

  let type = req.body.type;
  let id   = req.body.id;

  switch(type) {
    case "spaces" :
      // add to db

      // get db id as id

      break;
    case "spaces_header" :
      break;
    case "profile" :
      break;
    case 'blogs_header' :
      break;
    case 'blogs' :
      break;
    case 'event' :
      break;
    case 'company' :
      break;
    case 'home_community' :
      break;
    default:
      // it MUST be in this list
      res.status(400);
      return res.send({success: false});
  }

  let newPath = 'static/images/' + type + '/' + id + '.jpg';

  (async () => {
    await moveFile(file.path, newPath);
  })();

  let data = {
    success: true,
    data: {
      url: '/images/' + type + '/' + id + '.jpg'
    }
  };
  return res.send(data);
};