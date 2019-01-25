'use strict';

let socialMediaModel = require('../models/SocialMediaModel');

exports.getSites = function (req, res) {
    socialMediaModel.getSites().then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};
exports.addSite = function (req, res) {
    socialMediaModel.addSite(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};
exports.addResourceSite = function (req, res) {
    socialMediaModel.addResourceSite(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};