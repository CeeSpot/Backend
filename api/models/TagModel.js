'use strict';
var config = require('../config');

module.exports = {
    getUserTags: function () {
        return new Promise(function (resolve, reject) {
            config.con.query("SELECT * FROM tags", function (err, res) {
                if (err) {
                    reject(err)
                } else {
                    resolve(res);
                }
            })
        });
    },
    getCompanyTags: function () {
        return new Promise((resolve, reject) => {
            config.con.query(`SELECT * from companies_tags`, (err,res) => {
                if(err){
                    reject({
                        success: false,
                        data: err.toString()
                    })
                } else {
                    resolve({
                        success: true,
                        data: res
                    })
                }
            });
        })
    }
};