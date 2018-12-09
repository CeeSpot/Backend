/**
 * Created by thama on 23-11-2018.
 */
var bcrypt = require('bcryptjs');
let entities = require('./Entities');
/**
 * Gets a user by username
 * @param username
 * @param toRemove
 * @returns {Promise}
 */
function getUserByUsername(username, toRemove = null) {
    return new Promise(function (resolve, reject) {
        con.query("SELECT * from users WHERE username = ? ORDER BY username LIMIT 1", [username], function (err, results) {
            if (err) reject({userFound: null, message: "Failed to authenticate user"});

            if (typeof results === 'undefined' || results.length === 0) {
                // console.log("results: " + JSON.str);
                resolve({userFound: false, message: "Username and password do not match"});
            } else {
                let user = !toRemove ? entities.getJsonObjectFromDatabaseObject(results[0]) : entities.getJsonObjectFromDatabaseObject(results[0], toRemove);
                resolve({
                    userFound: true,
                    user: user
                });
            }
        });
    });
}
// function updateUser(data, id) {
//     return new Promise(function (resolve, reject) {
//        resolve("fuck me daddy");
//     });
// }
function updateUser(data, id) {
    let self = this;
    return new Promise(function (resolve, reject) {
        con.query("UPDATE users SET ? where id = ?", [data, id], function (err, res) {
            if (err) reject({success: false, message: err.toString()})
            self.getUserByUsername(data.username, {password: true}).then(userData => {
                resolve({success: true, message: entities.signToken(userData.user)})
            })
        });
    });
}
/**
 * Compares a candidate password with a hash
 *
 * @param candidatePassword
 * @param hash
 * @returns {Promise}
 */
function comparePassword(candidatePassword, hash) {
    console.log("candidate password: " + candidatePassword);
    return new Promise(function (resolve, reject) {
        bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
            if (err) reject({userFound: null, message: err.toString()});
            if (!isMatch) {
                resolve({isMatch: false, message: "Username and password do not match"});
            } else {
                resolve({isMatch: true});
            }
        });
    });
}

module.exports = {
    'getUserByUsername': getUserByUsername,
    'comparePassword': comparePassword,
    'updateUser': updateUser
};