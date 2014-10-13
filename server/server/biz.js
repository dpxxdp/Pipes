var mongoclient = require('mongodb').MongoClient
var format = require('util').format;

//bring in cache and mongo

function GetNext(params, callback) {
    
    var low_i = param[0];
    var high_i = param[1];

    mongoclient.connect('mongodb://127.0.0.1:27017/test', function(error, db) {
      if(error) callback(error)
    
      var collection = db.collection('test_insert');
      collection.insert({a:2}, function(err, docs) {
        
        collection.count(function(err, count) {
          console.log(format("count = %s", count));
        });
    
        // Locate all the entries using find
        collection.find().toArray(function(err, results) {
          console.dir(results);
          // Let's close the db
          db.close();
        });
      });
    })
}


function GetAll(params, callback) {
    
    mongoclient.connect('mongodb://127.0.0.1:27017/test', function(error, db) {
      if(error) callback(error)
        
        
    collection.find().toArray(function(err, results) {
      console.log("mongodb got all");
      
      callback(null, results);
      db.close();
    });
    
}


function Push(params, callback) {
    
    var bizData = params[0];
    
    mongoclient.connect('mongodb://127.0.0.1:27017/test', function(error, db) {
      if(error) callback(error)
    
      var collection = db.collection(bizData[id]);
      collection.insert(bizData, function(error, docs) {
        if (error) callback(error);
        
        collection.count(function(error, count) {
            if (error) callback(error);
            console.log(format("mongodb: inserted %s row(s)", count));
            db.close();
        });
      });
    })
}