const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "socket",
});
connection.connect((err)=>{
    if(err) throw err;
    console.log('Connecté à la base de donnée mysql')
});

module.exports = connection;
