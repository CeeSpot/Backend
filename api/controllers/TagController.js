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

exports.addTag = function (req, res) {
    tagModel.addTag(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

exports.editTag = function (req, res) {
    tagModel.editTag(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

exports.deleteTag = function (req, res) {
    tagModel.deleteTag(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};