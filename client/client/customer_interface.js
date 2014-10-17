var https_client = require('./https_client');
var data_factory = require('./data_factory');
var prompt = require('prompt');
var enumerations = require('../../common/biz/enum');

var buffer = '';

console.log("Welcome");

prompt.get(['email', 'desc', 'weight', 'loc', 'img'], function (err, result) {
	if (err) { return onErr(err); }


	var customerData = data_factory.CreateCustomerData(result.email, result.desc, result.weight, result.loc, result.img)

	var method = enumerations.METHODS.P_DATABASE;
	var operation = enumerations.P_DATABASE_OPERATIONS.INSERT;
	var params = {
		collection : "first_pipes_collection",
		docs : customerData
	}

	https_client.BuildAndSendRequest_CallBackWithResponse(method, operation, params, function(error, response) {
		if(error) 
		{
			console.log('Communication Error: ' + error);
		}
		else if(response.error) 
		{
			console.log('Operation Error: ' + response.error);
		}
		else {
			console.log('Successful ' + response.operation + "\nResults: " + response.results)
		}
	});


});

