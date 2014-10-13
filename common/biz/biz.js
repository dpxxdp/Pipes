var ObjectID = require('mongodb').ObjectID;
var TimeStamp = require('mongodb').TimeStamp;

Class CustomerDoc {
  ObjectId _id;
  TimeStamp time;
  CustomerData biz;
}

Class CustomerData {
  String name;
  String desc;
  String weight;
  
  Location location;
  String img;
}

Class Location {
  string long;
  string lat;
  string desc;
}
