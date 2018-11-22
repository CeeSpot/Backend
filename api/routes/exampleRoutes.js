'use strict';
module.exports = function(app) {
  console.log("Exporting routes!");
  var exampleController = require('../controllers/exampleController');

  // example Routes
  app.route('/example')
    .get(exampleController.example_function)
    .post(exampleController.example_function);
};
