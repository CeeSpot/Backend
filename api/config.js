/**
 * Created by thama on 22-11-2018.
 */
var mysql = require('mysql');

con = mysql.createConnection({
    host: "sql7.freesqldatabase.com",
    user: "sql7267229",
    password: "yR2KEAmxt1",
    database: "sql7267229"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("connected to mysql database");
});

module.exports = {
    'secret': 'superdupersecretpass',
    'con': con
};