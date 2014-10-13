var listenngPort = 8000;

var sslKey = 'test/fixtures/keys/agent2-key.pem';
var sslCert = 'test/fixtures/keys/agent2-cert.pem';

var sslServerOptions = {
    key: fs.readFileSync(serverSettings.sslKey),
    cert: fs.readFileSync(serverSettings.sslCert)
}

var remote_procedure_key = 12345;


var db_dir = '../db';

var databaseAddress = 'mongodb://127.0.0.1:27017/test';
