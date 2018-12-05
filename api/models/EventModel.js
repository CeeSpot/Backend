'use strict';
var config = require('../config');

module.exports = {
    getEvents: new Promise(function (resolve, reject) {
        con.query("SELECT * FROM events", function (err, res) {
            if (err) {
                reject(err)
            } else {
                resolve(res);
            }
        })
    })
};