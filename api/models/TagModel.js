'use strict';
var config = require('../config');

module.exports = {
    getTags: new Promise(function (resolve, reject) {
        con.query("SELECT * FROM tags", function (err, res) {
            if (err) {
                reject(err)
            } else {
                resolve(res);
            }
        })
    })
};