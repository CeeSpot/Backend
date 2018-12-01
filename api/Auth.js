/**
 * Created by thama on 22-11-2018.
 */
var jwt = require('jsonwebtoken');
var config = require('./config');

function verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(403).send({success:false,auth: false, message: 'No token provided.'});
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err)
            return res.status(500).send({success:false,auth: false, message: 'Failed to authenticate token.'});
        // if everything good, save to request for use in other routes
        req.user = decoded;
        next();
    });
}
module.exports = verifyToken;