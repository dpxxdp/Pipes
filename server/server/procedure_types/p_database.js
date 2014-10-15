/* remote procedure calls to access the db*/
var mongo_client = require('./db_clients/mongo_client')
var server_settings = require('../server_settings');

//p_database takes a p_database Request Object (passed from json_request.params)
//it calls the given requirement from ./requirements and passes params
//contains auth check

exports.ConsumeDbRequestObject_CallBackWithDbResponseObject = function (p_databaseRequestObject, callback) {
  //TODO security
  var key = server_settings.remote_procedure_key;
  
  console.log("p_database: consuming req object (toString): " + JSON.stringify(p_databaseRequestObject));
  
  var p_response = {};
  
  if (p_databaseRequestObject.auth === key) {
    switch(p_databaseRequestObject.operation) {
      case 'GetNext':
        mongo_client.GetNext_CallBackWithCustomerData(p_databaseRequestObject.params, function (error, customerData) {
          if (error) { callback(error); }
          else {
            p_databaseResponseObject = {
            "operation" : 'GetNext',
            "returnData" : customerData,
            "id" : p_databaseRequestObject.id
            }
          }
        });
        break;
      case 'GetAll':
        mongo_client.GetAll_CallBackWithCustomerDataBatch(p_databaseRequestObject.params, function (error, customerDataBatch) {
          if (error) { callback(error); }
          else {
            p_databaseResponseObject = {
            "operation" : 'GetAll',
            "returnData" : customerDataBatch,
            "id" : p_databaseRequestObject.id
            }
          }
        });
        break;
      case 'Push':
        mongo_client.Push_CallBackWithNoRowsInserted(p_databaseRequestObject.params, function (error, count) {
          console.log("p_database: mongo_client called back");
          if (error) { callback(error); }
          else {
            p_response = ConstructResponse('insert', count, request.id)
          }
        });
        break;
      default :
        callback("p_database error: operation does not exist");
        console.log("p_databaseId :" + p_databaseRequestObject.Id + "Operation does not exist:" + p_databaseRequestObject.operation);
        break;
    }
    console.log("p_database: constructed response (toString): " + JSON.stringify(p_databaseResponseObject))
    callback(null, p_databaseResponseObject);
  }
  else {
    callback("Operation is not authorized");
    console.log("plumbId :" + p_databaseRequestObject.Id + "unauthorized operation attempted" + p_databaseRequestObject.auth)
  }
}


function ConstructResponse(operation, returnData, id) {
  console.log("p_database: constructing response");
  
  var response = {
    'operation' : operation,
    'returnData' : returnData,
    'id' : id
  };
  
  return response;
}
