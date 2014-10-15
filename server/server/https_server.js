var https = require('https');
var url = require('url');
var fs = require('fs');

var server_settings = require('./server_settings');
var json_rpc_handler = require('./json_rpc_handler');

var port = server_settings.listeningPort;
var options = server_settings.sslServerOptions;

console.log('creating server...');
var secureServer = https.createServer(options, function (request, response) {
    console.log("server: received request of type: " + request.method);
    
      switch (request.method) {
	case 'POST':
	    //TODO figure out how to use request.body
	    //TODO security
	    //if request.auth ===...
	    var bodyBuffer = '';
	    
	    request.on('data', function(chunk) {
		//console.log("server: received encoded body chunk: "+ chunk.toString());
		bodyBuffer += chunk.toString();
	    });

	    request.on('end', function() {
		
		console.log("server: calling json_rpc_handler with request string: " + bodyBuffer)
		json_rpc_handler.ConsumeRequestString_CallBackWithResponseString(bodyBuffer, function (error, jsonResponseObject) {
		    console.log("server: json_rpc_handler called back");
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
	    });
	    break;
	case 'GET':
	    //for future performance enhancements, for now, we only speak in POSTs
	default:
	    console.log("Sent [404]. Method was not POST. Received " + request.method);
	    response.writeHead(404, {"Content-Type": "application/json"});
	    response.write("[404]: Must send a POST. You sent a " + request.method + " to " + request.hostname + request.url)
	    response.end();
	    break;
      }
});

secureServer.listen(port);
console.log("server: listening on port: " + port)
