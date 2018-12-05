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
var events = require('./api/routes/EventRoutes'); //importing route

users(app); //register the route
companies(app); //register the route
tags(app); //register the route
events(app);

console.log('the cee spot RESTful API server started on: ' + port);