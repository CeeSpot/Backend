'use strict';

let tagModel = require('../models/TagModel');

exports.getUserTags = function (req, res) {
    tagModel.getUserTags().then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

exports.getCompanyTags = function (req, res) {
    tagModel.getCompanyTags().then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};