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
    },
    toggleBlogActive: function (req) {
        return new Promise(function (resolve, reject) {
            console.log(req.body.is_on);
            con.query(`UPDATE settings SET is_on = ? WHERE name = 'Blogs'`, [
                req.body.is_on
            ], function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to toggle blog."
                    })
                } else {
                    resolve({
                        success: true,
                        data: "Successfully toggled blog active."
                    });
                }
            })
        })
    }
};