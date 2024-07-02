var mysql = require("mysql2")

var con = mysql.createConnection({
    host: '127.0.0.1',
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DB
});

con.connect(function(err){
    if(err) throw err;
    console.log('connected to the Database');
});

module.exports = con;
