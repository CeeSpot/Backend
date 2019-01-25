'use strict';

let adminModel = require('../models/AdminModel');
let auth = require('../Auth');


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




