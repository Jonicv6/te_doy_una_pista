const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'pi',
    password: 'raspberry-Jonicv6',
    database: 'app_Tedoyunapista'
});

mysqlConnection.connect(function (err) {
    if(err) {
        console.log(err);
        return;
    }else{
        console.log('Db is connected');
    }
});


module.exports = mysqlConnection;

