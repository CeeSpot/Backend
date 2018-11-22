'use strict';

module.exports = {
    getUsers: new Promise(function (resolve, reject) {
        con.query("SELECT * FROM users", function (err, result) {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }
        })
    })
};