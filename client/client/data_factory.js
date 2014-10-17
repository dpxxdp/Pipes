
exports.CreateCustomerData = function (newEmail, newDesc, newWeight, newLocation, newImg) {
    var customerData = {
        email : newEmail,
        desc : newDesc,
        weight : newWeight,
        location : newLocation,
        img : newImg
    };
    return customerData;
}

exports.CreatePDatabaseRequest = function (newOperation, newParams, newAuth, newId) {
    var request = {
        operation : newOperation,
        params : newParams,
        auth : newAuth,
        id : newId
    };
    return request;
}


exports.CreateJsonRpcRequest = function (newMethod, newParams, newId) {
    var request = {
        jsonrpc : "2.0",
        method : newMethod,
        params : newParams,
        id : newId
    }
    return request;
}