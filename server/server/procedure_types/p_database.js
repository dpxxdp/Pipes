/* remote procedure calls to access the db*/
var mongo_client = require('./db_clients/mongo_client')
var server_settings = require('../server_settings');
var procEnum = require('../../common/common/enum');

//p_database takes a p_database Request Object (passed from json_request.params)
//it calls the given requirement from ./requirements and passes params
//contains auth check




exports.ConsumeDbRequestObject_CallBackWithDbResponseObject = function (req, callback) {
	console.log("p_database: consuming request: " + JSON.stringify(req));
  
  	var PROCEDURE = procEnum.P_DB_PROCEDURES;
  	var adminKey = server_settings.admin_remote_procedure_key;
  	var customerKey = server_settings.customer_remote_procedure_key;
  	var p_response = {};
  	var id = req.id;
  	
  	
  	switch(req.operation) {
  		case PROCEDURE.INSERT:
  			if (req.auth !== (adminKey || customerKey)) {
    			console.log("p_database: unauthorized db insert operation request: " + id);
    			return callback("p_database: customer auth error, requestID: " + id);
  			}
  			mongo_client.DoProcedure_CallBackWithResults(req.operation, req.params, function (error, results) {
  				//console.log("p_database: mongo_client called back with error: " + error + "\n and results: " + results)
  				p_response = ConstructResponse(req.operation, error, results, id);
  				callback(null, p_response);
  			});
  			break;
  		case PROCEDURE.FIND:
  		case PROCEDURE.UPDATE:
  			if(req.auth !== (adminKey)) {
  				console.log("p_database: unauthorized db admin operation request: " + id);
    			return callback("p_database: admin auth error, requestID: " + id);
  			}
  			mongo_client.DoProcedure_CallBackWithResults(req.operation, req.params, function (error, results) {
  					//console.log("p_database: mongo_client called back with error: " + error + "\n and results: " + results)
  					p_response = ConstructResponse(req.operation, error, results, id);
  					callback(null, p_response);
  			});
  			break;
  		default:
  			console.log("p_database: unrecognized operation request: " + JSON.stringify(req.operation));
  			return callback("p_database: unrecognized operation request: " + JSON.stringify(req.operation.name));
  			break;
  	}
}

function ConstructResponse(operation, error, returnData, id) {
  //console.log("p_database: constructing response");
  
  var response = {
    'operation' : operation,
    'returnData' : returnData,
    'error' : error,
    'id' : id
  };
  
  return response;
}
