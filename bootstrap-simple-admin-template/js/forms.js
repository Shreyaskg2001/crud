const mysql = require("mysql");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Connect to the database
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "policy1",
});
router.get("/",function(request,response,next){
  var query="SELECT * FROM `policy` ORDER BY `policy`.`policy_name` ASC"
  database.query(query,function(error,data){
    if (error){
      throw error;
    }
    else{
      response.render('policy', {title:'Node.js MySQL CRUD Application', action:'list', policyData:data});
    }
  });

});

// Start the server
app.listen(3000, () => console.log("Server listening on port 5000"));
