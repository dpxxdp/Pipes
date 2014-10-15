var https = require('https');

var jsonrpc_request_object = {
    jsonrpc : '2.0',
    method : 'p_database',
    params : {operation: 'Push', auth: 'p_database_key', params: {email: "meg@that.com", name: "reg"}, id:"54321"},
    id : 12345
}

jsonrpc_request_string = JSON.stringify(jsonrpc_request_object);

var options = {
    hostname: '127.0.0.1',
    port: 8000,
    path: '/',
    method: 'POST',
    rejectUnauthorized: false,
    requestCert: true,
    agent: false
};

var req = https.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
});


req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

req.write(jsonrpc_request_string);
req.end();








