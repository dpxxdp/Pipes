var mongoclient = require('mongodb').MongoClient;
var format = require('util').format;
var server_settings = require('../../server_settings');

var mongoAddress = server_settings.databaseAddress;

function GetByEmail_CallBackWithCustomerData(params, callback) {
    
    var email = params[0];
    
    mongoclient.connect(mongoAddress, function(error, db) {
        if(error) callback(error)
        else {
            
            db.shippingData.find({'email':email}).toArray(function(error, results) {
                if (error) callback(error);
                
                callback(null, results);
                db.close();
            });
        }
    });
}


function GetAll_CallBackWithCustomerDataBatch(params, callback) {
    
    mongoclient.connect(mongoAddress, function(error, db) {
        if(error) callback(error)
        else {
            var customerDocument = db.collection();
            customerDocument.find({}).toArray(function(error, results) {
            if (error) {callback(error)}
            
            console.log("mongodb got all");
            callback(null, results);
            db.close();
            });
        }
    });
}


function Push_CallBackWithErrorCode(params, callback) {
    
    var customerData = params[0];
    
    mongoclient.connect(mongoAddress, function(error, db) {
        if(error) callback(error);
        else {
            var customerDocument = db.collection(docName);
            customerDocument.insert(customerData, function(error, docs) {
                if (error) callback(error);
                else {
                    collection.count(function(error, count) {
                        if (error) callback(error);
                        else {
                            console.log(format("mongodb: inserted %s row(s)", count));
                            db.close();
                        }
                    });
                }
            });
        }
    });
}
