var https = require('https');
var url = require('url');
var serverSettings = require('./serverSettings');

var json_rpc_handler = require('./json_rpc_handler');

var options = {
    key: fs.readFileSync(serverSettings.sslKey),
    cert: fs.readFileSync(serverSettings.sslCert)
}



var secureServer = https.createServer(options, function (request, response) {
    console.log("creating server...");
    
      //
      //log request information
	  //check request type
	  //check request credentials after each option
	  //response = 
	      //POST from Admin
		    //messageProcessor.ProcessAdminPost(request.data);
	      //POST from client
		    //messageProcessor.ProcessClientPost(request.data);
	      //GET from Admin
		    //messageProcessor.ProcessAdminGet(request.data);
	      //OTHER from Admin
		    //messageProcessor.ProcessOther(request.data);
      //
      
      
      switch (request.method) {
	case 'GET':
	    //TODO figure out how to use request.body
	    json_rpc_handler(request.body, function (error, jsonResponseObject) {
		if (error) {
		    console.log("[501] " + request.method + " to " + request.url);
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
	    //check auth
	    messenger.postThisData(request.body, function(error, responseObject) {
		if (error) {
		    response.writeHead();
		    response.write(error);
		    response.end();
		}
		else {
		    response.writeHead(200, {"Content-Type": "application/json"});
		    response.write()
		}
	    });
	    break;
	default:
	    response.writeHead(404, )
	    break;
      }
});

secureServer.listen(serverSettings.listeningPort);
console.log("server listening on port: " + listeningPort)