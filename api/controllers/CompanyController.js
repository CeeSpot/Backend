'use strict';

let companyModel = require('../models/CompanyModel');

exports.getCompanies = function (req, res) {
    companyModel.getCompanies.then(function (data) {
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