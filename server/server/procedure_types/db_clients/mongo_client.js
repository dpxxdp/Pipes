var mongoclient = require('mongodb').MongoClient;
var format = require('util').format;
var server_settings = require('../../server_settings');
var enumurations = require('../../common/common/enum');

var mongoAddress = server_settings.databaseAddress;
var PROCEDURE = enumerations.P_DB_PROCEDURES;


exports.DoProcedure_CallBackWithResults(operation, params, callback) {
    console.log("mongo_client: running procedure: " + operation.name);
    
    switch(operation) {
        case PROCEDURE.INIT:
            var collectionName = params.collection;
            
            mongoclient.connect(mongoAddress, function(error, db) {
                console.log("mongo_client: MongoClient just called back")
                if(error) { return callback(error) };
                
                var collection = db.collection(collectionName);
                console.log(format("mongo_client: init " + collectionName));
                db.close();
                callback(null, collectionName);
                
            });
            break;
            
        case PROCEDURE.INSERT: 
            var insertDocs = params.docs;
            var collectionName = params.collection;
            
            mongoclient.connect(mongoAddress, function(error, db) {
                console.log("mongo_client: MongoClient just called back")
                if(error) { return callback(error) };
                
                var collection = db.collection(collectionName);
                collection.insert(insertDocs, function(error, docs) {
                    console.log("mongo_client: test_collection just called back");
                    if (error) { return callback(error) };
                    
                    collection.count(function(error, count) {
                        if (error) { return callback(error) };
                        
                        console.log(format("mongo_client: insert successful in " + collectionName));
                        db.close();
                        callback(null, count);
                    });
                    
                });
                
            });
            break;
            
        case PROCEDURE.FIND:
            var query = params.query;
            var fields = params.fields;
            
            mongoclient.connect(mongoAddress, function(error, db) {
                console.log("mongo_client: MongoClient just called back")
                if(error) { return callback(error) };
                
                customerCollection.find(query, fields, function(error, docs) {
                    console.log("mongo_client: test_collection just called back");
                    if (error) { return callback(error) };
                        
                        console.log(format("mongo_client: find successful"));
                        db.close();
                        callback(null, docs);
                });
                
            });
            
            break;
            
        case PROCEDURE.UPDATE:
        default:
            console.log("p_database: unrecognized operation request: " + JSON.stringify(operation.name));
            return callback("p_database: unrecognized operation request: " + JSON.stringify(operation.name));
            break;
    }
}
