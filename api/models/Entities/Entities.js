/**
 * Created by thama on 23-11-2018.
 */
let jwt = require('jsonwebtoken');
let config = require('../../config');
let bcrypt = require('bcryptjs');

/**
 * Compares a candidate password with a hash
 *
 * @param candidatePassword
 * @param hash
 * @returns {Promise}
 */
function comparePassword(candidatePassword, hash) {
    return new Promise(function (resolve, reject) {
        console.log(candidatePassword)
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

/**
 * Create a json object from a database user and exlucde colums in the exluded object
 *
 * @param user database user
 * @param excluded list with excluded colums
 * @returns {{user json object}}
 */
function getJsonObjectFromDatabaseObject(user, excluded) {
    let userObj = {};
    for (let property in user) {
        if (user.hasOwnProperty(property) && (typeof excluded === 'undefined' || !excluded[property])) {
            userObj[property] = user[property];
        }
    }
    return userObj;
}

function signToken(data) {
    let expiresIn = 86400;
    return jwt.sign(data, config.secret, {expiresIn: expiresIn})
}


module.exports = {
    'getJsonObjectFromDatabaseObject': getJsonObjectFromDatabaseObject,
    'signToken': signToken,
    'comparePassword': comparePassword
};