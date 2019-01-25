'use strict';
let socialMediaController = require('../controllers/SocialMediaController');
let auth = require('../Auth');

module.exports = function (app) {
    app.route('/api/socialmedia').get(socialMediaController.getSites);
    app.route('/api/socialmedia').post(auth.verifyToken, socialMediaController.addSite);
    app.route('/api/socialmedia/resource').post(auth.verifyToken, socialMediaController.addResourceSite);
};
