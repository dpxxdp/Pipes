var https = require('https');
var fs = require('fs');


var responseDataDump = './get_results.txt';
var getParams = {
    'which' : 'all'
}

var requestOptions = {
    hostname : 'localhost',
    port : 8000,
    path : encodeURIComponent(JSON.stringify(getParams)),
    method : 'GET'
}


var secureRequest = https.request(requestOptions, function(response) {
    
    response.on('data', function(data) {
        
        fs.appendFile(responseDataDump, data + '\n', function(err) {if(err) throw err;});
        
    });
    
});


secureRequest.end();


secureRequest.on('error', function(error) {
    
    fs.appendFile(responseDataDump, "!!!REQUEST RETURNED ERROR!!!" + error + '\n', function(err) {if(err) throw err;});
    
});