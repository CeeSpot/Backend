let mysql = require('mysql');

con = mysql.createConnection({
    host: "194.145.201.29",
    user: "ceespot",
    password: "ceespot",
    database: "the_cee_database"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("connected to mysql database");
});

module.exports = {
    'secret': 'superdupersecretpass',
    'con': con,
    'encryptRounds': 10
};