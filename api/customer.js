
var http = require('http');
var mysql = require('mysql');
var db = mysql.createPool({
	database : 'hearing_centre',
     user : 'cio_choice',
	password : '10gXWOqeaf',
    host :'cxohonour.com',
 });

 var CRUD = require('mysql-crud');
 var customerCRUD = CRUD(db, 'customer');

/*
Retrieve all customers from customer table
*/
exports.allCustomer = function(req, res) {
	var query = "SELECT * from customer";
		db.query(query, function(err, rows){
	res.jsonp(rows);
	});
};

/*
Retrieve customer using NRIC/FIN number
*/
exports.findByIc = function(req, res) {
  	console.log(req.params.ic);
	var ic = req.params.ic ;

	var query = 'select * from customer where `nric`="' + ic +'";';
		console.log(query);
		db.query(query, function(err, rows){
			var userdetails = rows[0] ;
			res.jsonp(rows);
		});
 };

 
