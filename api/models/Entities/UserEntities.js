/**
 * Created by thama on 23-11-2018.
 */
let bcrypt = require('bcryptjs');
let entities = require('./Entities');
let config = require('../../config');

/**
 * Gets a user by username
 * @param username
 * @param toRemove
 * @returns {Promise}
 */
function getUserByUsername(username, toRemove = null) {
    return new Promise(function (resolve, reject) {
        config.con.query("SELECT * from users WHERE username = ? ORDER BY username LIMIT 1", [username], function (err, results) {
            if (err) reject({userFound: null, data: "Failed to authenticate user"});

            if (typeof results === 'undefined' || results.length === 0) {
                resolve({userFound: false, data: "Username and password do not match"});
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

/**
 * Updates user data given data and ID
 *
 * @param data
 * @param id
 * @returns {Promise<any>}
 */
function updateUser(data, id) {
    let self = this;
    return new Promise(function (resolve, reject) {
        config.con.query("UPDATE users SET ? where id = ?", [data, id], function (err, res) {
            if (err) reject({success: false, data: err.toString()});
            self.getUserByUsername(data.username, {password: true}).then(userData => {
                resolve({success: true, token: entities.signToken(userData.user)})
            });
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
    return new Promise(function (resolve, reject) {
        bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
            if (err) reject({userFound: null, data: err.toString()});
            if (!isMatch) {
                resolve({isMatch: false, data: "Password is not correct"});
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