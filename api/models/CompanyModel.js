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
    }),
    getCompany: function (req) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM companies WHERE id = ?`, [req.params.company_id], function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to get event"
                    })
                } else {
                    resolve({
                        success: true,
                        data: res
                    });
                }
            })
        });
    }
};