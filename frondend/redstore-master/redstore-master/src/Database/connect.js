var mysql = require('mysql');  
var con = mysql.createConnection({  
  host: "localhost", //host
  user: "root",  //user name
  password: "1111"  // password
});  
con.connect(function(err) {  
  if (err) throw err;  
  console.log("Connected!");  
});  