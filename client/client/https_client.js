var https = require('https');
var fs = require('fs');

var responseDataDump = './datadump.txt';

var requestOptions = {
    hostname : 'localhost',
    port : 8000,
    path : '/',
    method : 'GET'
}

var postData = {
    
    
}

var secureRequest = https.request(requestOptions, function(response) {
    
    response.on('data', function(data) {
        
        fs.appendFile(responseDataDump, data + '\n', function(err) {if(err) throw err;});
        
    });
    
});


if (isPostRequest) {
    secureRequest.write(postData);
}


secureRequest.end();


secureRequest.on('error', function(error) {
    
    fs.appendFile(responseDataDump, "!!!REQUEST RETURNED ERROR!!!" + error + '\n', function(err) {if(err) throw err;});
    
});