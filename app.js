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
app.get('/api/findByIc/:ic', customer.findByIc);
app.get('/api/getoption', customer.getOption);

app.post('/api/insertcustomer', customer.insertCustomer);


var singapore = connect();
singapore.use(serveStatic('singapore'));
app.use('/singapore', singapore);

app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})
console.log("Magic at 5000");
