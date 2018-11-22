var express = require('express'),
app = express(),
port = process.env.PORT || 3000;
bodyParser = require('body-parser');
mysql = require('mysql');

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

var routes = require('./api/routes/exampleRoutes'); //importing route
routes(app); //register the route

console.log('the cee spot RESTful API server started on: ' + port);

