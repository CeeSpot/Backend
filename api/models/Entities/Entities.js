/**
 * Created by thama on 23-11-2018.
 */

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

module.exports = {
    'getJsonObjectFromDatabaseObject': getJsonObjectFromDatabaseObject
};