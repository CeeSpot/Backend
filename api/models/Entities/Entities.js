/**
 * Created by thama on 23-11-2018.
 */
let jwt = require('jsonwebtoken');
let config = require('../../config');
let Enums = require('../../Enums');

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
};