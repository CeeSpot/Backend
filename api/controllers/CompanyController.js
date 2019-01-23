'use strict';

let companyModel = require('../models/CompanyModel');

exports.getCompanies = function (req, res) {
    companyModel.getCompanies().then(function (data) {
            res.send(data);
        }).catch(function (err) {
            res.send(err);
        });
};

exports.getCompany = function (req, res) {
    companyModel.getCompany(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

exports.createCompany = function (req, res) {
    companyModel.createCompany(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

exports.me = function (req, res) {
    companyModel.me(req).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    })
};
exports.updateCompany = function (req, res) {
    companyModel.updateCompany(req).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    })
};
