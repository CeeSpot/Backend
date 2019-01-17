'use strict';
var config = require('../config');

module.exports = {
    getSettings: function (req) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM settings`, function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to get settings"
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