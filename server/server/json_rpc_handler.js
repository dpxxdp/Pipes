var fs = require('fs');
var p_database = require('./procedure_types/p_database');



//The JSON-RPC Handler exports one function
//It takes a JSON-RPC Request String and a Callback function with signature callback(error, jsonResponseString)

/*JSON-RPC Request Object takes the form:
            jsonrpc : "2.0",
            method : p_database (uses the p_database remote procedure toolkit)
            params : <p_database Request Object>
            id : <uniqueId>
*/

exports.ConsumeRequestString_CallBackWithResponseString = function (jsonRequestString, callback) {
    console.log("json_rpc_handler: received request string: " + jsonRequestString);
    
    var jsonRequestObject = JSON.parse(jsonRequestString);
    
      
    if (jsonRequestObject.jsonrpc === "2.0"){
        //console.log("json_rpc_handler: received RPC Object: " + jsonRequestObject);
        
        switch (jsonRequestObject.method) {
            case 'p_database':
                p_database.ConsumeDbRequestObject_CallBackWithDbResponseObject(jsonRequestObject.params, function (error, p_databaseResponseObject) {
                    console.log("json_rpc_handler: p_database called back");
                    if (error) callback(error);
                    else {
                        var jsonResponseObject = {
                            "jsonrpc" : "2.0",
                            "result" : p_databaseResponseObject,
                            "error" : error,
                            "id" : jsonRequestObject.id
                        }
                        
                        console.log("json_rpc_handler: constructing RPC response (toString): " + JSON.stringify(jsonResponseObject));
                        var jsonResponseString = JSON.stringify(jsonResponseObject);
                        callback(null, jsonResponseString); 
                    }
                });
                break;
            case 'p_virtual':
                //for expansion into virtual, in memory toolbox
            default:
                callback("unrecognized procedure_type (in JSONrequest.method)")
                console.log("ERROR: unrecognized procedure_type (in JSONrequest.method)");
                break;
        }
    }
    else {
        callback("unrecognized JSONrequest jsonrpc");
        console.log("ERROR: unrecognized JSONrequest jsonrpc");
    }
}
