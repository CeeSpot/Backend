'use strict';
var config = require('../config');

module.exports = {
    getBlogs: function (req) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM blogs`, function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to get blogs"
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