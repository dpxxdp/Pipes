var biz = require('./biz')



//plumbing takes a Plumbing Request Object (passed from json_request.params) 
//it calls the given requirement from ./requirements and passes params
//contains auth che

function WouldSomebodyPleaseDoThePlumbing(plumbingRequestObject, callback) {
    
    //TODO security
    var key = "CRYPT";
    var plumbingResponseObject;
    
    if (plumbingRequestObject.auth === key) {
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



