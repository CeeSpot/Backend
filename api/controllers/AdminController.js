'use strict';

var adminModel = require('../models/AdminModel');
var auth = require('../Auth');


exports.getSettings = function (req, res) {
    adminModel.getSettings(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

exports.toggleBlogActive = function (req, res) {
    adminModel.toggleBlogActive(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};




