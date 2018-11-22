'use strict';

exports.example_function = function(req, res) {
  console.log("Entering controller!");

  var exampleModel = require('../models/exampleModel');
  new Promise(function(resolve, reject){
  	resolve(exampleModel.example_modal_function());
  }).then((data) => {
  	console.log(data);
  	res.send(data);
  })
  // exampleModel.example_modal_function();
  // var users = exampleModel.example_model_function();
  // console.log(users);
  // res.send(users);
}