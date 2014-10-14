var https = require('https');
var url = require('url');
var server_settings = require('./server_settings');
var json_rpc_handler = require('./json_rpc_handler');
var fs = require('fs');

var port = server_settings.listeningPort;

console.log('creating server...');
var secureServer = https.createServer(server_settings.sslServerOptions, function (request, response) {
    console.log("server callback fired...");
    
      switch (request.method) {
	case 'POST':
	    //TODO figure out how to use request.body
	    //TODO security
	    //if request.auth ===...
	    json_rpc_handler.ConsumeRequestString_CallBackWithResponseString(request.body, function (error, jsonResponseObject) {
		if (error) {
		    console.log("Sent [500] in response to " + request.method + "\nError: " + error);
		    response.writeHead(500, {"Content-Type": "application/json"});
		    response.write(error);
		    response.end();
		}
		else {
		    console.log("Sent [200] in response to " + request.method);
		    response.writeHead(200, {"Content-Type": "application/json"});
		    response.write(jsonResponseObject);
		    response.end();
		}
	    });
	    
	    break;
	case 'GET':
	    //for future performance enhancements, for now, we'll only use POSTs
	default:
	    console.log("Sent [404]. Method was not POST. Received " + request.method);
	    response.writeHead(404, {"Content-Type": "application/json"});
	    response.write("[404]: Must send a POST. You sent a " + request.method + " to " + request.url)
	    response.end();
	    break;
      }
});

secureServer.listen(port);
console.log("server listening on port: " + port)
