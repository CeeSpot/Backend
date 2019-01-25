'use strict';
var editTextController = require('../controllers/EditTextController');
var auth = require('../Auth');
module.exports = function (app) {

  // example Routes
  app.route('/api/text/edit').put(auth.verifyToken, editTextController.editText);
  app.route('/api/text').get(editTextController.getText);
  app.route('/api/text/:text_id').get(editTextController.getTextByKey);
};
