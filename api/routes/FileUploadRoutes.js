'use strict';

let multer = require('multer');
let upload = multer({dest: 'static/images/unsorted'});
let fileUploadController = require('../controllers/FileUploadController');

module.exports = function (app) {
  app.post('/api/file_upload', upload.single('image'), (req, res) => {
    fileUploadController.fileUpload(req, res, req.file)
  });
};
