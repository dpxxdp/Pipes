var fs = require('fs');


exports.listeningPort = 8000;

var sslKey = 'ssl/test-key.pem';
var sslCert = 'ssl/test-cert.pem';

exports.sslServerOptions = {
    key: fs.readFileSync(sslKey),
    cert: fs.readFileSync(sslCert)
}

exports.admin_remote_procedure_key = "key";
exports.customer_remote_procedure_key = "key";

exports.databaseAddress = 'mongodb://127.0.0.1:27017/test';


exports.db_config =
{
    
}