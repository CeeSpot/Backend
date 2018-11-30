'use strict';

var tagModel = require('../models/TagModel');

exports.getTags = function (req, res) {
    tagModel.getTags.then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};