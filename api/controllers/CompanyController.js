'use strict';

var companyModel = require('../models/CompanyModel');

exports.getCompanies = function (req, res) {
    companyModel.getCompanies.then(function (data) {
            res.send(data);
        }).catch(function (err) {
            res.send(err);
        });
};
