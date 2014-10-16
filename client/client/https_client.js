var https = require('https');
var data_factory = require('./datafactory');
var client_settings = require('./client_settings');
var enumerations = require('../../common/enum');


exports.BuildAndSendRequest_CallBackWithResponse = function(method, operation, params, callback) {
	
	var METHODS = enumerations.METHODS;
	var id = client_settings.uniqueId;
	var auth = client_settings.procedure_auth;
	
	//set options
	var options = client_settings.requestOptions;
	
	//build body
	switch(method) {
		case METHODS.P_DATABASE:
			var rpcParam = CreatePDatabaseRequest(operation, params, auth, id);
			var body = CreateJsonRpcRequest(METHODS.P_DATABASE, rpcParam, id);
			break;
		case METHODS.P_VIRTUAL:
		default:
			return callback("https_client: method unrecognized: " + method.name);
			console.log("https_client: method unrecognized: " + method.name);
	}
	
	//send request
	var secureRequest = https.request(options, function(response) {
		console.log('https_client: request called back');
		
		if(response.headers.status != '200'){
			//console.log('HEADERS: ' + JSON.stringify(response.headers));
			return callback("https_client: response error: " + response.headers);
		}
		
		response.setEncoding('utf8');
		
		var responseBuff = '';
		
		response.on('data', function (chunk) {
			responseBuff += chunk;
		});

		response.on('end', function() {
			//console.log('BODY: ' + responseBuff);
			callback(null, responseBuff);
		}
	});

	secureRequest.write(body);
	secureRequest.end();
}

