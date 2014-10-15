


exports.P_DB_PROCEDURES = {
  INIT: { name : "init", params : [collection: "collection"] },
  INSERT : { name : "insert", params : [ customerData : "customerData" ] },
  FIND : { name: "find", params : [ query: "query", fields: "fields" ] },
  UPDATE : { name: "update", params : [ customerData: "customerData" ] }
}
