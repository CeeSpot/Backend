'use strict';
var userController = require('../controllers/UserController');
var auth = require('../Auth');

module.exports = function (app) {

    // example Routes
    app.route('/api/users').get(userController.getUsers);

    app.route('/api/users/register').post(userController.registerUser);
    app.route('/api/users/authenticate').post(userController.authenticate);
    app.route('/api/users/profile/:userId').get(userController.profile);
    app.route('/api/users/me').get(auth.verifyToken, userController.me);
    app.route('/api/users/updateme').put(auth.verifyToken, userController.updateMe);
};
