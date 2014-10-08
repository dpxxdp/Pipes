var https = require('https');
var url = require('url');
var serverSettings = require('./serverSettings');
var messageProcessor = require('./messageProcessor');

var options = {
    key: fs.readFileSync(serverSettings.sslKey),
    cert: fs.readFileSync(serverSettings.sslCert)
}

var secureServer = https.createServer(options, function (request, response) {
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
});

secureServer.listen(serverSettings.listeningPort);