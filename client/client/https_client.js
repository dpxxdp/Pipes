var https = require('https');
var data_factory = require('./data_factory');
var client_settings = require('./client_settings');
var enumerations = require('../../common/biz/enum');


exports.BuildAndSendRequest_CallBackWithResponse = function(method, operation, params, callback) {
	
	var METHODS = enumerations.METHODS;
	var id = client_settings.uniqueId;
	var auth = client_settings.procedure_auth;
	
	//set options
	var options = client_settings.requestOptions;
	
	//build body
	switch(method) {
		case METHODS.P_DATABASE:
			var rpcParam = data_factory.CreatePDatabaseRequest(operation, params, auth, id);
			var body = data_factory.CreateJsonRpcRequest(METHODS.P_DATABASE, rpcParam, id);
			break;
		case METHODS.P_VIRTUAL:
		default:
			return callback("https_client: method unrecognized: " + method.name);
			console.log("https_client: method unrecognized: " + method.name);
	}
	
	//send request
	var secureRequest = https.request(options, function(response) {
		console.log('https_client: request called back');
		
		if(response.statusCode != '200'){
			//console.log('HEADERS: ' + JSON.stringify(response.headers));
			return callback("https_client: response error: " + JSON.stringify(response.statusCode));
		}
		
		response.setEncoding('utf8');
		
		var responseBuff = '';
		
		response.on('data', function (chunk) {
			responseBuff += chunk;
		});

		response.on('end', function() {
			var responseObj = JSON.parse(responseBuff);
			if(responseObj.jsonrpc != '2.0') { 
				console.log("https_client: JSON response unrecognized: " + responseObj.jsonrpc);
				return callback("https_client: JSON response unrecognized: " + responseObj.jsonrpc); 
			}

			callback(null, responseObj.result);
		});

	});

	var bodyAsString = JSON.stringify(body);

	secureRequest.write(bodyAsString);
	secureRequest.end();
}
