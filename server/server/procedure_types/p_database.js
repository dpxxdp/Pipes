/* remote procedure calls to access the db*/
var mongo_client = require('./db_clients/mongo_client')


//p_database takes a p_database Request Object (passed from json_request.params)
//it calls the given requirement from ./requirements and passes params
//contains auth check

function ConsumeDbRequestObject_CallBackWithDbResponseObject(p_databaseRequestObject, callback) {
  //TODO security
  var key = server_settings.remote_procedure_key;
  
  if (p_databaseRequestObject.auth === key) {
    switch(operation) {
      case 'GetNext':
        biz.GetNext_CallBackWithCustomerData(p_databaseRequestObject.params, function (error, customerData) {
          if (error) { callback(error); }
          else
          {
            var p_databaseResponseObject = {
            "operation" : 'GetNext',
            "returnData" : customerData,
            "id" : p_databaseRequestObject.id
            }
          }
        });
        break;
      case 'GetAll':
        biz.GetAll_CallBackWithCustomerDataBatch(p_databaseRequestObject.params, function (error, customerDataBatch) {
          if (error) { callback(error); }
          else
          {
            var p_databaseResponseObject = {
            "operation" : 'GetAll',
            "returnData" : customerDataBatch,
            "id" : p_databaseRequestObject.id
            }
          }
          });
        break;
      case 'Push':
        biz.Push_CallBackWithErrorCode(p_databaseRequestObject.params, function (error) {
          if (error) { callback(error); }
          else
          {
            var p_databaseResponseObject = {
            "operation" : 'Push',
            "returnData" : true,
            "id" : p_databaseRequestObject.id
            }
          }
        });
        break;
      default :
        callback("Operation does not exist");
        console.log("plumbId :" + p_databaseRequestObject.Id + "Operation does not exist:" + p_databaseRequestObject.operation);
        break;
      callback(null, p_databaseResponseObject);
    }
  }
  else {
  callback("Operation is not authorized");
  console.log("plumbId :" + p_databaseRequestObject.Id + "unauthorized operation attempted" + p_databaseRequestObject.auth)
  }
}
