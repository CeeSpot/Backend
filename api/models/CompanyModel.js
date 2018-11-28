'use strict';
var config = require('../config');

module.exports = {
    getCompanies: new Promise(function (resolve, reject) {
        con.query("SELECT * FROM companies", function (err, res) {
            if (err) {
                reject(err)
            } else {
                resolve(res);
            }
        })
    })
};