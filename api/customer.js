var http = require('http');
var mysql = require('mysql');
var db = mysql.createPool({
	database : 'hearingcenter',
    user : 'ftdev',
	password : '10gXWOqeaf',
    host :'apps.fountaintechies.com',
 });

 var CRUD = require('mysql-crud');
 var customerCRUD = CRUD(db, 'customer');
 var custResponseCRUD = CRUD(db, 'custResponse');
 var newsLetterCRUD = CRUD(db, 'newsletter');
 var custMedicalHistoriesCRUD = CRUD(db, 'custMedicalHistories');
 var patientLogCRUD = CRUD(db, 'patientLog');
 var appointmentCRUD = CRUD(db, 'appointment');
 var feedbackCRUD = CRUD(db, 'feedback');


/******************************************************
Get all patient appointment from DB
*/
exports.getAllFeedback = function(req, res){

	var query = 'select * from feedback';

	db.query(query, function(err, rows){
		//console.log(rows);
		res.jsonp(rows);
	});

} 

/******************************************************
Get all patient appointment from DB
*/
exports.insertFeedback = function(req, res){
	
	var clinic = req.body.clinic;
	var feedbackValue = req.body.value;
	var response = "";
	
	console.log(clinic);
	if(feedbackValue == 5){
		response = "excellent";
	}else if(feedbackValue == 4){
		response = "good";
	}else if(feedbackValue == 3){
		response = "average";
	}else if(feedbackValue == 2){
		response = "poor";
	}else{
		response = "veryPoor";
	}

	feedbackCRUD.create({
		'clinic' : clinic,
		'feedback' : response,
		'feedback_value': feedbackValue,
	},function (err,vals){
		
	})

}


/******************************************************
Get all patient appointment from DB
*/
exports.getAppt = function(req, res){

	var query = 'select * from appointment';
	//var query = 'select * from appointment where `nric`="' + ic +'" ORDER BY id DESC;';

	db.query(query, function(err, rows){
		console.log(rows);
		res.jsonp(rows);
	});

}
	

/******************************************************
Insert patient appointment into DB
*/
exports.insertAppt = function(req, res){

	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var nric = req.body.nric;
	var clinic = req.body.clinic;
	var day = req.body.day;
	var month = req.body.month;
	var year = req.body.year;

	appointmentCRUD.create({
			'firstName': firstName,
			'lastName' : lastName,
			'nric': nric,
			'clinic' : clinic,
			'day': day,
			'month' : month,
			'year': year,
		},function (err,vals){
			
		})
}


/******************************************************
Update customer info in customer DB
*/
exports.updateCustomer = function(req, res) {
	console.log(req.body);
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var mobile_number = req.body.mobile_number;
	var home_number = req.body.home_number;
	var id = req.body.id;
	var gender = req.body.gender;
	var residential_address = req.body.residential_address;
	var postal = req.body.postal;
	var country = req.body.country;
	var nric = req.body.nric;
	var email = req.body.email;

	customerCRUD.update({'id' : id}, {firstName:firstName, lastName:lastName, mobile_number:mobile_number, home_number:home_number,gender:gender, residential_address:residential_address, postal:postal, country:country , nric:nric , email_address:email}, function (err, vals) {
		if(parseInt(vals.affectedRows)>0){
			var resdata={status:true,
			message:'staff successfully updated'};
			//res.jsonp(resdata);
		}else{
			var resdata={status:false,
			message:'record not updated '};
			//res.jsonp(resdata);
		}
	});
};


/******************************************************
Get patient log from DB
*/
exports.getPatientLog = function(req, res){
	console.log(req.params);
	var ic = req.params.ic ;

	var query = 'select * from patientLog where `nric`="' + ic +'" ORDER BY id DESC;';

		db.query(query, function(err, rows){
			var userdetails = rows[0] ;
			res.jsonp(rows);
		});

}
/******************************************************
Insert patient log into DB
*/
exports.insertPatientLog = function(req, res){

	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var nric = req.body.nric;
	var tabType = req.body.tabType;
	var date = req.body.date;
	var time = req.body.time;
	var remark = req.body.remark;

	patientLogCRUD.create({
			'firstName': firstName,
			'lastName' : lastName,
			'nric': nric,
			'tabType' : tabType,
			'date': date,
			'time' : time,
			'remark': remark,
		},function (err,vals){
			
		})
}


/******************************************************
Delete customer from db
*/
exports.deleteCustomer = function(req, res) {
	
	for(var i=0; i<req.body.length; i++){

		var id = req.body[i].id ;

		customerCRUD.destroy({'id' : id}, function (err, vals) {
			
			if(parseInt(vals.affectedRows)>0){
				var resdata={status:true,
					message:'patient successfully deleted'};
				//res.jsonp(resdata);
			}else{
				var resdata={status:false,
				message:'record not found '};
				//res.jsonp(resdata);
			}
		});

	}
	

	
 };


/******************************************************
insert medical histories
*/
exports.insertHistories = function(req, res){

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

	var ic = req.params.ic ;

	var query = 'SELECT customer.*, b.description FROM customer LEFT JOIN custType b ON b.id = customer.type WHERE `nric`="' + ic +'";';

	db.query(query, function(err, rows){
		var userdetails = rows[0] ;
		res.jsonp(rows);

		console.log('rows',rows);

	
	});
 };

 
