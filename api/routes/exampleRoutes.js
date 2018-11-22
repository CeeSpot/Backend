'use strict';
module.exports = function(app) {
  var exampleController = require('../controllers/exampleController');

  // example Routes
  app.route('/example')
    .get(exampleController.example_function)
    .post(exampleController.example_function);
};
