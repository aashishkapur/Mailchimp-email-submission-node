

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

require('dotenv').load();

var request = require('request');

var listID = process.env.MAILCHIMP_LIST_ID;
var apiKey = process.env.MAILCHIMP_API_KEY;
var url = "https://" + "us12" + ".api.mailchimp.com/3.0/lists/" + listID + "/members";
	// The URL depends on the last few characters of your API Key for Mailchimp
	// For example, my API key was "....-us12", indicating that the subdomain of 
	// the url should be "us12".

app.set('port', (process.env.PORT || 5000));

app.post('/', function(req, res){

	var data = {"email_address":req.body.email,"status" : "subscribed"};

	request.post(
		url,
		{
			json : true,
			body : data,
			auth :{
				'user': 'anystring',
				'pass': apiKey
			},
			gzip:true
		},
		function (error, response, body) {
			console.log(body);
		}
	);
	res.end();

});

app.use(express.static(__dirname + '/app'));

app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'));
});