/* remote procedure calls to access the db*/
var biz = require('./biz')
//p_database takes a p_database Request Object (passed from json_request.params)
//it calls the given requirement from ./requirements and passes params
//contains auth che
function DoDatabaseProcedure(p_databaseRequestObject, callback) {
  //TODO security
  var key = server_settings.plumbingKey;
  var p_databaseResponseObject;
  if (p_databaseRequestObject.auth === key) {
    switch(operation) {
      case 'GetNext':
        biz.GetNext(plumbingRequestObject.params, function (error, customerData) {
          if (error) { callback(error); }
          else
          {
            plumbingResponseObject = {
            "operation" : 'GetNext',
            "returnData" : customerData,
            "id" : plumbingRequestObject.id
            }
          }
        });
        break;
      case 'GetAll':
        biz.GetAll(plumbingRequestObject.params, function (error, customerDataBatch) {
          if (error) { callback(error); }
          else
          {
            plumbingResponseObject = {
            "operation" : 'GetAll',
            "returnData" : customerData,
            "id" : plumbingRequestObject.id
            }
          }
          });
        break;
      case 'Push':
        biz.Push(plumbingRequestObject.params, function (error) {
          if (error) { callback(error); }
          else
          {
            plumbingResponseObject = {
            "operation" : 'Push',
            "returnData" : true,
            "id" : plumbingRequestObject.id
            }
          }
        });
        break;
      default :
        callback("Operation does not exist");
        console.log("plumbId :" + plumbingRequestObject.Id + "Operation does not exist:" + plumbingRequestObject.operation);
        break;
      callback(null, plumbingResponseObject);
    }
  }
  else {
  callback("Operation is not authorized");
  console.log("plumbId :" + plumbingRequestObject.Id + "unauthorized operation attempted" + plumbingRequestObject.auth)
  }
}
