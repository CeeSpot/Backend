'use strict';
let textModel = require('../models/TextModel');


exports.editText = function (req, res) {
  textModel.editText(req).then(function (data) {
    res.send(data);
  }).catch(function (err) {
    res.send(err);
  });
};

exports.getText = function (req, res) {
  textModel.getText(req).then(function (data) {
    res.send(data);
  }).catch(function (err) {
    res.send(err);
  });
};

exports.getOneText = function (req, res) {
  textModel.getOneText(req).then(function (data) {
    res.send(data);
  }).catch(function (err) {
    res.send(err);
  });
};
