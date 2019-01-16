var express = require('express');
var cors = require('cors');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

app.use(cors({credentials: true, origin: true}));

app.listen(port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

let users = require('./api/routes/UserRoutes'); //importing route
let companies = require('./api/routes/CompanyRoutes'); //importing route
let events = require('./api/routes/EventRoutes'); //importing route
let tags = require('./api/routes/TagRoutes'); //importing route
let socialMedia = require('./api/routes/SocialMediaRoutes'); //importing route
let blogs = require('./api/routes/BlogRoutes'); //importing route
let spaces = require('./api/routes/SpaceRoutes'); //importing route

users(app); //register the route
companies(app); //register the route
tags(app); //register the route
events(app); //register the route
socialMedia(app); //register the route
blogs(app); //register the route
spaces(app); //register the route

console.log('the cee spot RESTful API server started on: ' + port);