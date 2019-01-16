'use strict';
var config = require('../config');

module.exports = {
    getSpaces: function (req) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM spaces ORDER BY title ASC`, function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to get spaces"
                    })
                } else {
                    resolve({
                        success: true,
                        data: res
                    });
                }
            })
        });
    },
    addRequest: function (req) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM spaces ORDER BY title ASC`, function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to get spaces"
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