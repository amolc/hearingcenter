
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
 var custResponseCRUD = CRUD(db, 'custResponse');
 var newsLetterCRUD = CRUD(db, 'newsletter');
 var custMedicalHistoriesCRUD = CRUD(db, 'custMedicalHistories');


/******************************************************
Delete customer from db
*/
exports.deleteCustomer = function(req, res) {
	console.log(req);
	console.log(req.params);
  	console.log(req.params.ic);
	var id = req.params.id ;

	customerCRUD.destroy({'id' : id}, function (err, vals) {
	console.log(vals.affectedRows);
		
		// if(parseInt(vals.affectedRows)>0){
		// 	var resdata={status:true,
		// 		message:'patient successfully deleted'};
		// 	res.jsonp(resdata);
		// }else{
		// 	var resdata={status:false,
		// 	message:'record not found '};
		// 	res.jsonp(resdata);
		// }
	});

	
 };


/******************************************************
insert medical histories
*/
exports.insertHistories = function(req, res){
	console.log(req.body);
	var custId = req.body.custId;
	var bloodGrp = req.body.bloodGrp;

	custMedicalHistoriesCRUD.create({
			'custId': custId,
			'bloodGrp' : bloodGrp,
		},function (err,vals){
			
		})
}


/******************************************************
Retrieve misc checkbox option
*/
exports.getOption = function(req, res){
	var query = "SELECT * from misc";
		db.query(query, function(err, rows){
	res.jsonp(rows);
	});

}

/******************************************************
insert misc checkbox option
*/
exports.insertMisc = function(req, res){
	var submittedOption = req.body;
	var custId = submittedOption[0];
	var newsOption =submittedOption[1];

	var newsLetter = [];
	newsLetter.push(custId);
	newsLetter.push(newsOption);
	includeNewsletter(newsLetter);

	for(var i=2; i<submittedOption.length; i++){
	
		var miscId = submittedOption[i].id;
		var name = submittedOption[i].name;

		custResponseCRUD.create({
			'custId': custId,
			'miscId' : miscId,
			'name': name
		},function (err,vals){
			
		})
	}

}

/******************************************************
insert newsletter option
*/

function includeNewsletter(req, res){

	for(var i=req.length-1; i<req.length; i++){
		var custId = req[0];
		var sub = "no";

		if(req[1]){
			sub = "yes";
		}

		newsLetterCRUD.create({
			'custId': custId,
			'subscribe' : sub,
		},function (err,vals){
			
		})

	}
}

/******************************************************
insert customer into db
*/
exports.insertCustomer = function(req, res){
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var country = req.body.country;
	var nric = req.body.nric;
	var gender = req.body.gender;
	var mobile_number = req.body.mobile_number;
	var home_number = req.body.home_number;
	var email_address = req.body.email_address;
	var residential_address = req.body.residential_address;
	var postal = req.body.postal;

	customerCRUD.create({
		'firstName': firstName,
		'lastName' : lastName,
		'country': country,
		'nric': nric,
		'gender': gender,
		'mobile_number': mobile_number,
		'home_number': home_number,
		'email_address': email_address,
		'residential_address': residential_address,
		'postal': postal

	},function (err,vals){
		if (!err) {
			var resdata={status:true,
			message:'Staff successfully added'};
	  		res.jsonp(resdata);
		} else{
			var resdata={status:false,
			message:'record not added '};
			res.jsonp(resdata);
		}
	})
}


/******************************************************
Retrieve all customers from customer table
*/
exports.allCustomer = function(req, res) {
	var query = "SELECT * from customer";
		db.query(query, function(err, rows){
	res.jsonp(rows);
	});
};

/******************************************************
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

 
