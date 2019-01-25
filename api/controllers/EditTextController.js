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

exports.getTextByKey = function (req, res) {
  textModel.getTextByKey(req).then(function (data) {
    res.send(data);
  }).catch(function (err) {
    res.send(err);
  });
};
