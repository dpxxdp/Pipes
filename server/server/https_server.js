var https = require('https');
var url = require('url');
var serverSettings = require('./serverSettings');

var json_rpc_handler = require('./json_rpc_handler');

var secureServer = https.createServer(server_settings.sslServerOptions, function (request, response) {
    console.log("creating server...");
    
      switch (request.method) {
	case 'GET':
	    //TODO figure out how to use request.body
	    //TODO security
	    //if request.auth ===...
	    json_rpc_handler(request.body, function (error, jsonResponseObject) {
		if (error) {
		    console.log("[500] " + request.method + " to " + request.url);
		    response.writeHead(500, {"Content-Type": "application/json"});
		    response.write(error);
		    response.end();
		}
		else {
		    console.log("[200] " + request.method + " to " + request.url);
		    response.writeHead(200, {"Content-Type": "application/json"});
		    response.write(jsonResponseObject);
		    response.end();
		}
	    });
	    
	    break;
	case 'POST':
	    //TODO security
	    //if request.auth ===...
	    json_rpc_handler(request.body, function (error, jsonResponseObject) {
		if (error) {
		    console.log("[500] " + request.method + " to " + request.url);
		    response.writeHead(500, {"Content-Type": "application/json"});
		    response.write(error);
		    response.end();
		}
		else {
		    console.log("[200] " + request.method + " to " + request.url);
		    response.writeHead(200, {"Content-Type": "application/json"});
		    response.write(jsonResponseObject);
		    response.end();
		}
	    });
	    break;
	default:
	    console.log("[404] " + request.method + " to " + request.url);
	    response.writeHead(404, {"Content-Type": "application/json"});
	    response.write("[404] " + request.method + " to " + request.url)
	    response.end();
	    break;
      }
});

secureServer.listen(serverSettings.listeningPort);
console.log("server listening on port: " + listeningPort)