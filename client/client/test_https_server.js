var https = require('https');
var enumerations = require('../../common/biz/enum');

var jsonrpc_init_request_object = {
    jsonrpc : '2.0',
    method : enumerations.METHODS.P_DATABASE,
    params : {operation: enumerations.P_DATABASE_OPERATIONS.INIT, auth: 'p_database_key_admin', params: { collection : "first_pipes_collection"}, id:"987"},
    id : "987"
}

var jsonrpc_insert_request_object = {
    jsonrpc : '2.0',
    method : enumerations.METHODS.P_DATABASE,
    params : {operation: enumerations.P_DATABASE_OPERATIONS.INSERT, 
        auth: 'p_database_key_admin', 
        params: {
            collection : "first_pipes_collection", 
            docs : {email: "first_pipes@email.", name: "big"}
        }, 
        id:"654"},
    id : "654"
}

jsonrpc_request_string = JSON.stringify(jsonrpc_insert_request_object);

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








