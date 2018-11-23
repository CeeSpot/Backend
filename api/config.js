/**
 * Created by thama on 22-11-2018.
 */
var mysql = require('mysql');

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

module.exports = {
    'secret': 'superdupersecretpass',
    'con': con
};