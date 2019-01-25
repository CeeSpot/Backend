'use strict';
var ContactController = require('../controllers/ContactController');
var auth = require('../Auth');
module.exports = function (app) {

  // example Routes
  app.route('/api/contact').post(ContactController.sendContactForm);
};
