/**
 * Created by thama on 22-11-2018.
 */
var jwt = require('jsonwebtoken');
var config = require('./config');
var Enums = require('./Enums');

function verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({success: false, authorised: false, message: 'No token provided.'});
    }
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
            return res.status(500).send({success: false, authorised: false, message: 'Failed to authenticate token.'});
        }
        // if everything good, save to request for use in other routes
        req.user = decoded;
        if (typeof req.user.company_resource_roles === 'undefined' || req.user.company_resource_roles === null) {
            config.con.query("SELECT user_role_id FROM user_user_roles WHERE user_id = ?", [decoded.id], function (err, res) {
                req.user.isGuestUser = res[0].user_role_id === Enums.resourceRoles.GUEST_USER;
                req.user.isFellow = res[0].user_role_id === Enums.resourceRoles.FELLOW;
                req.user.isPartner = res[0].user_role_id === Enums.resourceRoles.PARTNER;
                req.user.isStandardUser = res[0].user_role_id === Enums.resourceRoles.STANDARD_USER;
                req.user.isAdmin = res[0].user_role_id === Enums.resourceRoles.ADMIN;
                next();
            });
        } else {
            req.user.isCompany = true;
            req.company = req.user;
            delete req.user
            next();
        }
    });
}
function verifyFunctionToken(req, optional = false) {
    return new Promise(function (resolve, reject) {
        let token = req.headers['x-access-token'];
        if((typeof token === 'undefined') || (token === null)){
            if (!optional) {
                reject({success: false, auth: false, message: 'Failed to authenticate token'});
            }else{
                resolve({success: true, auth: false, data: '', error: 'No token given'});
            }
        }else {
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    if (!optional) {
                        reject({success: false,auth: false, message: 'Failed to authenticate token'
                        });
                    } else {
                        resolve({success: true, auth: false, data: '', error: err})
                    }
                }
                // if everything good, save to request for use in other routes
                resolve({success: true, data: decoded });
            });
        }
    });
}
// module.exports = verifyToken;
module.exports = {
    'verifyToken' : verifyToken,
    'verifyFunctionToken': verifyFunctionToken
};