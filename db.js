var mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Workday01@",
    database: "db"
});


con.connect(function(err) {
    if(err){
        return console.error('error: '+ err.message);
    }
    console.log("Connected!");


    exports.unameCheck = function(){
        alert(777);
    }
});


con.end(function(err) {
    if (err){
        return console.log('error: ' + err.message);
    }
    console.log('Close the db connection.')
});
