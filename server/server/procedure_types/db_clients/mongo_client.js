var mongoclient = require('mongodb').MongoClient;
var format = require('util').format;
var server_settings = require('../../server_settings');

var mongoAddress = server_settings.databaseAddress;

exports.GetByEmail_CallBackWithCustomerData = function (params, callback) {
    
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


exports.GetAll_CallBackWithCustomerDataBatch = function (params, callback) {
    
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


exports.Push_CallBackWithNoRowsInserted = function (params, callback) {
    console.log("mongo_client: connecting to mongodb");
    var customerData = params;
    
    mongoclient.connect(mongoAddress, function(error, db) {
        if(error) callback(error);
        else {
            var testCollection = db.collection('testCollection');
            testCollection.insert(customerData, function(error, docs) {
                console.log("mongo_client: test_collection just called back");
                if (error) callback(error);
                else {
                    testCollection.count(function(error, count) {
                        if (error) callback(error);
                        else {
                            console.log(format("mongo_client: inserted %s row(s)", count));
                            console.log("mongo_client: inserted: " + customerData)
                            db.close();
                            callback(null, count);
                        }
                    });
                }
            });
        }
    });
}
