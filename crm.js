var connect = require('connect');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var path = require('path');
var bodyParser = require( 'body-parser' );
var nodemailer = require( 'nodemailer' );
var cors = require('cors');
var http = require("http").createServer(app);

/*
-------All js files
*/
var customer = require('./api/customer.js');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Credentials', false);
  next();
});

app.use(bodyParser.json({ limit: '50mb', extended: true, type:'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, type:'application/x-www-form-urlencoding' }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ limit: '50mb' }));


/*
---app.get and app.post methods
*/
app.get('/api/allcustomer', customer.allCustomer);
app.get('/api/customerType', customer.customerType);
app.get('/api/findByIc/:ic', customer.findByIc);
app.get('/api/getoption', customer.getOption);
app.get('/api/getPatientLog/:ic', customer.getPatientLogOld);
app.get('/api/getAppt', customer.getAppt);
app.get('/api/getAllFeedback', customer.getAllFeedback);

app.post('/api/insertcustomer', customer.insertCustomer);
app.post('/api/deleteCustomer', customer.deleteCustomer);
app.post('/api/updateCustomer', customer.updateCustomer);
app.post('/api/insertmisc', customer.insertMisc);
app.post('/api/insertHistories', customer.insertHistories);
app.post('/api/insertPatientLog', customer.insertPatientLog);
app.post('/api/insertAppt', customer.insertAppt);
app.post('/api/insertFeedback', customer.insertFeedback);
app.get('/api/customerType', customer.customerType);
app.get('/api/redeem-list', customer.redeemList);
app.post('/api/my-items', customer.gerMyItems);
app.post('/api/add-redeem', customer.addRedeem);

//patient note api
app.get('/api/note/:nric', customer.getPatientNoteAll);
app.get('/api/note/:nric/:id', customer.getPatientNote);
app.post('/api/note/:nric', customer.createPatientNote);
app.put('/api/note/:nric/:id', customer.updatePatientNote);
app.delete('/api/note/:nric/:id', customer.deletePatientNote);

//patient log api
app.get('/api/log/:nric', customer.getPatientLogAll);
app.get('/api/log/:nric/:id', customer.getPatientLog);
app.post('/api/log/:nric', customer.createPatientLog);
app.put('/api/log/:nric/:id', customer.updatePatientLog);
app.delete('/api/log/:nric/:id', customer.deletePatientLog);

//patient task api
app.get('/api/task/:nric', customer.getPatientTaskAll);
app.get('/api/task/:nric/:id', customer.getPatientTask);
app.post('/api/task/:nric', customer.createPatientTask);
app.put('/api/task/:nric/:id', customer.updatePatientTask);
app.delete('/api/task/:nric/:id', customer.deletePatientTask);

//patient task api
app.get('/api/appointment/:nric', customer.getPatientAppointmentAll);
app.get('/api/appointment/:nric/:id', customer.getPatientAppointment);
app.post('/api/appointment/:nric', customer.createPatientAppointment);
app.put('/api/appointment/:nric/:id', customer.updatePatientAppointment);
app.delete('/api/appointment/:nric/:id', customer.deletePatientAppointment);


app.get('/api/feedback', customer.getFeedback);


var customer = connect();
customer.use(serveStatic('customer'));
app.use('/', customer);

var admin = connect();
admin.use(serveStatic('admin'));
app.use('/admin', admin);

app.listen(7000, function () {
  console.log('CORS-enabled web server listening on port 7000')
})
console.log("Magic at 7000");
