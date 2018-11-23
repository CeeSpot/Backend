/**
 * Created by thama on 23-11-2018.
 */
var bcrypt = require('bcryptjs');

/**
 * Gets a user by username
 * @param username
 * @returns {Promise}
 */
function getUserByUsername(username) {
    return new Promise(function (resolve, reject) {
        con.query("SELECT * from users WHERE username = ? ORDER BY username LIMIT 1", [username], function (err, results) {
            if (err) reject({userFound: null, message: err.toString()});

            if (results.length === 0) {
                resolve({userFound: false, message: "No users found with this username"});
            } else {
                var user = getUserFromDatabaseUser(results[0]);
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
                console.log("error: invalid password");
                resolve({isMatch: false, message: "Invalid password"});
            } else {
                resolve({isMatch: true});
            }
        });
    });
}
/**
 * Create a json object from a database user and exlucde colums in the exluded object
 *
 * @param user database user
 * @param excluded list with excluded colums
 * @returns {{user json object}}
 */
function getUserFromDatabaseUser(user, excluded) {
    var userObj = {};
    for (var property in user) {
        if (user.hasOwnProperty(property) && (typeof excluded === 'undefined' || !excluded[property])) {
            userObj[property] = user[property];
        }
    }
    return userObj;
}

module.exports = {
    'getUserByUsername': getUserByUsername,
    'comparePassword': comparePassword,
    'getUserFromDatabaseUser': getUserFromDatabaseUser
};