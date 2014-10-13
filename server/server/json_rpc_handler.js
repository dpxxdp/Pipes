var fs = require('fs');
var plumbing = require('./plumbing');



//The JSON-RPC Handler exports one function
//It takes a JSON-RPC Request String and a Callback function with signature callback(error, jsonResponseString)

/*JSON-RPC Request Object takes the form:
            jsonrpc : "2.0",
            method : p_database (uses the p_database remote procedure toolkit)
            params : <p_database Request Object>
            id : <uniqueId>
*/

function Handle(jsonRequestString, callback) {
    console.log("json_rpc_handler...");
    
    var jsonRequestObject = JSON.parse(jsonRequestString);
    
    
    if (jsonRequestObject.jsonrpc === "2.0"){
        switch (jsonRequestObject.method) {
            case 'p_database':
                p_database.CallDatabaseProcedure(jsonRequestObject.params, function (error, p_databaseResponseObject) {
                    if (error) {
                        callback(error);
                    }
                    else {
                        var jsonResponseObject = {
                            "jsonrpc" : "2.0",
                            "result" : p_databaseResponseObject,
                            "error" : error,
                            "id" : jsonRequestObject.id
                        }
                        
                        var jsonResponseString = stringify(jsonResponseObject);
                        callback(null, jsonResponseString); 
                    }
                });
        }
    }
    else {
        callback("jsonrpc must be 2.0");
        console.log("jsonrpc must be 2.0");
    }
    
}
