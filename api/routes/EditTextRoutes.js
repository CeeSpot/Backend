'use strict';
var editTextController = require('../controllers/EditTextController');
var auth = require('../Auth');
module.exports = function (app) {

  // example Routes
  app.route('/api/text/edit').put(editTextController.editText);
  app.route('/api/text').get(editTextController.getText);
};
