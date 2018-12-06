var express = require('express');
var cors = require('cors');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

app.use(cors());

app.listen(port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var users = require('./api/routes/UserRoutes'); //importing route
var companies = require('./api/routes/CompanyRoutes'); //importing route
var tags = require('./api/routes/TagRoutes'); //importing route

app.set('etag', false);

app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, must-revalidate, private');
    // res.json(res.JSONResponse);\
    next()
});

users(app); //register the route
companies(app); //register the route
tags(app); //register the route

console.log('the cee spot RESTful API server started on: ' + port);