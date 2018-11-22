var express = require('express');
var session = require('express-session');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(cors());

con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "the_cee_database"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("connected to mysql database");
});

app.listen(port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var users = require('./api/routes/UserRoutes'); //importing route
users(app); //register the route
console.log('the cee spot RESTful API server started on: ' + port);

