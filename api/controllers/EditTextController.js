'use strict';
let textModel = require('../models/TextModel');

exports.editText = function (req, res) {
  textModel.editText(req).then(function (e) {
    res.send({success: true, data: {textEdited: true}});
  }).catch(function (err) {
    console.log(err);
    res.send({success: false, data: {textEdited: false}});
  });
};

exports.getText = function (req, res) {
  textModel.getText(req).then(function(e) {
    res.send({success: true, data: e})
  }).catch(function (err) {
    console.log(err);
    res.send({success: false, data: {text: false}});
  });
};