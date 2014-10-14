var fs = require('fs');


exports.listeningPort = 8000;

var sslKey = 'ssl/test-key.pem';
var sslCert = 'ssl/test-cert.pem';

exports.sslServerOptions = {
    key: fs.readFileSync(sslKey),
    cert: fs.readFileSync(sslCert)
}

exports.remote_procedure_key = 12345;


exports.databaseAddress = 'mongodb://127.0.0.1:27017/test';


exports.db_config =
{
    
}