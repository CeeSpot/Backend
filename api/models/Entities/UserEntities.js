/**
 * Created by thama on 23-11-2018.
 */
var bcrypt = require('bcryptjs');
let entities = require('./Entities');
/**
 * Gets a user by username
 * @param username
 * @returns {Promise}
 */
function getUserByUsername(username) {
    return new Promise(function (resolve, reject) {
        con.query("SELECT * from users WHERE username = ? ORDER BY username LIMIT 1", [username], function (err, results) {
            if (err) reject({userFound: null, message: "Failed to authenticate user"});

            if (results.length === 0) {
                resolve({userFound: false, message: "Username and password do not match"});
            } else {
                var user =entities.getJsonObjectFromDatabaseObject(results[0]);
                resolve({
                    userFound: true,
                    user: user
                });
            }
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
};