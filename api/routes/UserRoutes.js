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
    app.route('/api/users/delete').delete(userController.deleteUser);
    app.route('/api/users/update').put(userController.updateUser);
    app.route('/api/users/updateme').put(auth.verifyToken, userController.updateMe);
    app.route('/api/users/changepassword').put(auth.verifyToken, userController.changePassword);
    app.route('/api/users/companies').post(auth.verifyToken, userController.addUserCompany);
    app.route('/api/users/tags').post(auth.verifyToken, userController.addTags);
};
