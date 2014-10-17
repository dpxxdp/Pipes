var mongoclient = require('mongodb').MongoClient;
var format = require('util').format;
var server_settings = require('../../server_settings');
var enumurations = require('../../../../common/biz/enum');

var mongoAddress = server_settings.databaseAddress;
var PROCEDURE = enumurations.P_DATABASE_OPERATIONS;


exports.DoProcedure_CallBackWithResults = function(operation, params, callback) {
    console.log("mongo_client: running procedure: " + operation);
    
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

            console.log("mongo_client: params: " + params.query + ", params as string:" + JSON.stringify(params.query));

            mongoclient.connect(mongoAddress, function(error, db) {
                console.log("mongo_client: MongoClient just called back")
                if(error) { return callback(error) };

                var collection = db.collection(params.collection);
                
                collection.find(params.query, function(error, cursor) {
                    console.log("mongo_client: test_collection just called back");
                    if (error) { return callback(error) };
                        
                    cursor.toArray(function(error, docs)) {
                        console.log(format("mongo_client: find successful"));
                        db.close();
                        //console.log(docs);
                        callback(null, docs);
                    });
                });
            });
            
            break;
            
        case PROCEDURE.UPDATE:
        default:
            console.log("p_database: unrecognized operation request: " + JSON.stringify(operation));
            return callback("p_database: unrecognized operation request: " + JSON.stringify(operation));
            break;
    }
}
