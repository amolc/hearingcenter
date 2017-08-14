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
 var logsCRUD = CRUD(db, 'patient_logs');
 var appointmentCRUD = CRUD(db, 'appointment');
 var feedbackCRUD = CRUD(db, 'feedback');
 var redeemCRUD = CRUD(db, 'redeems');
 var customerRedeemsCRUD = CRUD(db, 'customer_redeems');



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
	var custypeID = req.body.custypeID;

	customerCRUD.update({'id' : id}, {custypeID:custypeID, firstName:firstName, lastName:lastName, mobile_number:mobile_number, home_number:home_number,gender:gender, residential_address:residential_address, postal:postal, country:country , nric:nric , email_address:email}, function (err, vals) {

		if(parseInt(vals.affectedRows)>0)
		{
			var resdata={status:true,
			message:'staff successfully updated'};
			//res.jsonp(resdata);

			console.log('resdata: ',resdata);
		}
		else
		{
			var resdata={status:false,
			message:'record not updated '};

			console.log('resdata: ',resdata);
			//res.jsonp(resdata);
		}
	});
};


/******************************************************
Get patient log from DB
*/
exports.getPatientLogOld = function(req, res){
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
	var lastVisit = req.body.lastVisit;
	var nextAppointment = req.body.nextAppointment;

	customerCRUD.create({
		'firstName': firstName,
		'lastName' : lastName || "",
		'country': country,
		'nric': nric,
		'gender': gender,
		'mobile_number': mobile_number,
		'home_number': home_number || "",
		'email_address': email_address,
		'residential_address': residential_address || "",
		'postal': postal || "",
		'custypeID': 1,
		'points': 1000,
		'lastVisit': lastVisit,
		'nextAppointment': nextAppointment,
		'questionnaire': ""

	},function (err,vals){
		if (!err) {
			var resdata={status:true,
			message:'Staff successfully added'};
	  		res.jsonp(resdata);
		} else{
			var resdata={status:false,
			message:'record not added '};
			console.log(err);

			res.jsonp(resdata);
		}
	})
}


/******************************************************
Retrieve all customers from customer table
*/
exports.allCustomer = function(req, res) {
	var query = "SELECT customer.*, b.description, b.color FROM customer LEFT JOIN custType b ON b.custypeID = customer.custypeID WHERE 1";
		db.query(query, function(err, rows){
	res.jsonp(rows);
	});
};

/******************************************************
Retrieve all customers type from cusType Table
*/
exports.customerType = function(req, res) {
	var query = "SELECT * FROM custType";
	db.query(query, function(err, rows){
		res.jsonp(rows);
	});
};

/******************************************************
Retrieve customer using NRIC/FIN number
*/
exports.findByIc = function(req, res) {

	var ic = req.params.ic ;

	var query = 'SELECT customer.*, b.description, b.color FROM customer LEFT JOIN custType b ON b.custypeID = customer.custypeID WHERE `nric`="' + ic +'";';

	db.query(query, function(err, rows){
		var userdetails = rows[0] ;
		res.jsonp(rows);

		console.log('rows',rows);

	
	});
 };

exports.redeemList = function (req, res) {
	var query = "SELECT * FROM redeems";
	db.query(query, function(err, rows){
		res.jsonp(rows);
	});
};

exports.gerMyItems = function (req, res) {
	var query = "SELECT  redeems.* FROM `customer`, `customer_redeems`, `redeems`  WHERE customer.id = customer_redeems.customer_id AND redeems.id = customer_redeems.redeem_id AND customer.nric = '"+ req.body.nric +"'";
	db.query(query, function(err, rows){
		res.jsonp(rows);
	});
};

exports.addRedeem = function (req, res) {
	var customer_id = req.body.customer_id;
	var redeem_id = req.body.redeem_id;

	customerCRUD.load({id: customer_id}, function (err, vals) {
		
		
		if(vals && vals[0] && vals[0].points){
			var new_point = vals[0].points - 200;
			if(new_point < 0){console.log(new_point);

				res.jsonp({status:false,
					message:'You have insufficient points'});
				return;
			}
			customerCRUD.update({id: customer_id}, {points: new_point}, function (err, val) {
				console.log("new update",vals);
			});
			customerRedeemsCRUD.create({
				customer_id: customer_id,
				redeem_id: redeem_id,
				total: 0
			},function (err,vals){
				if (!err) {
					var resdata={status:true,
						message:'Staff successfully added'};
					res.jsonp(resdata);
				} else{
					var resdata={status:false,
						message:'record not added '};
					console.log(err);

					res.jsonp(resdata);
				}
			});
		}
	});



};

exports.getPatientNoteAll = function (req, res) {
	var nric = req.params.nric;
	var type = 'note';
	logsCRUD.load({nric: nric, type: type}, function (err, data) {
		res.json(data);
	});
};

exports.getPatientNote = function (req, res) {
	var nric = req.params.nric;
	var id = req.params.id;
	var type = 'note';
	logsCRUD.load({id: id, nric: nric, type: type}, function (err, data) {
		res.json(data);
	});
};

exports.createPatientNote = function (req, res) {
	var createObj = {
		customer_id: req.body.customer_id,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		nric: req.params.nric,
		type: 'note',
		description: req.body.description,
		created_at: new Date()
	};
	logsCRUD.create(createObj, function (err, data) {
		console.log(data)
		res.json(data);
	});
};

exports.updatePatientNote = function (req, res) {
	var updateObj = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		nric: req.params.nric,
		type: 'note',
		description: req.body.description
	};
	logsCRUD.update({id: req.params.id}, updateObj, function (err, data) {
		res.json(data);
	});
};

exports.deletePatientNote = function (req, res) {
	logsCRUD.destroy({id: req.params.id}, function (err, data) {
		res.json(data);
	})
};

exports.getPatientLogAll = function (req, res) {
	var nric = req.params.nric;
	var type = 'log';
	logsCRUD.load({nric: nric, type: type}, function (err, data) {
		res.json(data);
	});
};

exports.getPatientLog = function (req, res) {
	var nric = req.params.nric;
	var id = req.params.id;
	var type = 'log';
	logsCRUD.load({id: id, nric: nric, type: type}, function (err, data) {
		res.json(data);
	});
};

exports.createPatientLog = function (req, res) {
	var createObj = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		nric: req.params.nric,
		type: 'log',
		description: req.body.description,
		created_at: new Date()
	};
	logsCRUD.create(createObj, function (err, data) {
		res.json(data);
	});
};

exports.updatePatientLog = function (req, res) {
	var updateObj = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		nric: req.params.nric,
		type: 'log',
		description: req.body.description
	};
	logsCRUD.update({id: req.params.id}, updateObj, function (err, data) {
		res.json(data);
	});
};

exports.deletePatientLog = function (req, res) {
	logsCRUD.destroy({id: req.params.id}, function (err, data) {
		res.json(data);
	})
};

exports.getPatientTaskAll = function (req, res) {
	var nric = req.params.nric;
	var type = 'task';
	logsCRUD.load({nric: nric, type: type}, function (err, data) {
		res.json(data);
	});
};

exports.getPatientTask = function (req, res) {
	var nric = req.params.nric;
	var id = req.params.id;
	var type = 'task';
	logsCRUD.load({id: id, nric: nric, type: type}, function (err, data) {
		res.json(data);
	});
};

exports.createPatientTask = function (req, res) {
	var createObj = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		nric: req.params.nric,
		type: 'task',
		description: req.body.description,
		end_date: req.body.	end_date,
		status: req.body.status,
		created_at: new Date()
	};
	logsCRUD.create(createObj, function (err, data) {
		res.json(data);
	});
};

exports.updatePatientTask = function (req, res) {
	var updateObj = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		nric: req.params.nric,
		type: 'task',
		description: req.body.description,
		end_date: req.body.	end_date,
		status: req.body.status
	};
	logsCRUD.update({id: req.params.id}, updateObj, function (err, data) {
		res.json(data);
	});
};

exports.deletePatientTask = function (req, res) {
	logsCRUD.destroy({id: req.params.id}, function (err, data) {
		res.json(data);
	});
};
