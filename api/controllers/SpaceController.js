'use strict';

var spaceModel = require('../models/SpaceModel');

exports.getSpaces = function (req, res) {
    spaceModel.getSpaces(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

exports.addRequest = function (req, res) {
    spaceModel.addRequest(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};